<template>
  <div class="quillWrapper">
    <slot name="toolbar"></slot>
    <div 
        :id="id"
        ref="quillContainer"
    ></div>
    <input
      v-if="useCustomImageHandler"
      id="file-upload"
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display:none;"
      @change="emitImageInfo($event)"
    />
  </div>
</template>

<script>
import Quill from "quill";
import oldApi from "@/helpers/old-api";
import mergeDeep from "@/helpers/merge-deep";
import MarkdownShortcuts from "@/helpers/markdown-shortcuts";
import moment from 'moment';
import Api from '../../api/api';
import { ACTIONS, NOTEBOOKS, EMBED, DAYS } from '../../config/contants';
import Vue from 'vue'

export default {
  name: "VueEditor",
  mixins: [oldApi],
  props: {
    id: {
      type: String,
      default: "quill-container"
    },
    className: {
      type: String,
      default: "slide-active"
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean
    },
    editorToolbar: {
      type: Array,
      default: () => []
    },
    editorOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    useCustomImageHandler: {
      type: Boolean,
      default: false
    },
    useMarkdownShortcuts: {
      type: Boolean,
      default: false
    },
    updateContent: { 
      type: Function 
    },
    selectQuote: {
      type: Function
    },
    quote: {
      type: Boolean,
      default: false
    },
    event: {
      type: Object,
      default:  () => ({
      }),
    },
    insert_content: {
      type: Object,
      default: () => ({
      })
    }   
  },

  data: () => ({
    quill: null,
    is_paragraphs: false,
    paragraphs_title: "",
    paragraphs_id: "",
    paragraphs: "",
    note_id: "",
    update_content: false
  }),
 
  watch: {
    value(val) {
      if (this.update_content || (val != this.quill.root.innerHTML && !this.quill.hasFocus())) {
        this.quill.root.innerHTML = val
        this.update_content = false
      }
    },

    disabled(status) {
      this.quill.enable(!status);
    }
  },

  mounted() {
    this.registerPrototypes();
    this.initializeEditor();
    this.$store.state.note.notebooks = NOTEBOOKS

    if(typeof this.event.$on == 'function'){
      this.event.$on('ops', () => {
        this.$store.state.note.opt = this.quill.getSelection()
        });
    } 
    if(this.insert_content.ops != null){
       setTimeout(()=>{
        this.quill.setSelection(this.$store.state.note.opt.index)
        const selection = document.getSelection()
        let node = selection.getRangeAt(0).commonAncestorContainer
        
        this.quill.insertText( this.$store.state.note.opt.index, this.insert_content.ops[0].insert)
        let tree
        if(node.innerHTML == '<br>'){
          tree = node
        }else{
          tree = node.parentNode
        }
        
        if(this.insert_content.ops[0].insert.split('\n').length>0){
          tree.nextSibling.classList.add('quote-start')
        }
  
        for(let i =0; i<this.insert_content.ops[0].insert.split('\n').length; i++){
          tree = tree.nextSibling
          tree.classList.add('quote')
        }    

        if(this.insert_content.ops[0].insert.split('\n').length>0){
          tree.classList.add('quote-end')
        }

        this.quill.setSelection(this.$store.state.note.opt.index + this.insert_content.ops[0].insert.length)
        this.quill.insertText(this.quill.getSelection(), '\n')

        tree.nextSibling.removeAttribute("class")
        $(".quote").attr('contenteditable','false');
        this.insert_content.ops = null
       }, 300) 
    }
  },

  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  },


  methods: {
    initializeEditor() {
      this.setupQuillEditor();
      this.checkForCustomImageHandler();
      this.handleInitialContent();
      this.registerEditorEventListeners();
      this.$emit("ready", this.quill);
    },

    setupQuillEditor() {
      let editorConfig = {
        debug: false,
        modules: this.setModules(),
        theme: "snow",
        placeholder: this.placeholder ? this.placeholder : "",
      };

      let Block = Quill.import('blots/block');
      Block.tagName = 'DIV';
      Quill.register(Block, true);

      let Inline = Quill.import('blots/inline');
      class  SpanTagInline extends Inline {
        formats() {
          const tagName = 'span'
          return tagName
        }
      }
      Quill.register(SpanTagInline)

      let icons = Quill.import('ui/icons');
      icons['image'] = '<img src="images/icon-camera.svg" class="icon" data-icon="camera" />';
      icons['bold'] = '<img src="images/icon-bold.svg" class="icon" data-icon="bold" />';
      icons['italic'] = '<img src="images/icon-italic.svg" class="icon" data-icon="italic" />';
      icons['underline'] = '<img src="images/icon-underline.svg" class="icon" data-icon="underline" />';
      icons['list']['bullet'] = '<img src="images/icon-list.svg" class="icon" data-icon="bullet" />';
      icons['indent']['+1'] = '<img src="images/icon-indent.svg" class="icon" data-icon="indent" />';
      icons['color'] = '<span class="icon" data-icon="color"></span>';

      this.prepareEditorConfig(editorConfig);
      this.quill = new Quill(this.$refs.quillContainer, editorConfig);
    },

    setModules(){
      let bindings = {
        list: {
          key: 'enter',
          handler: (range, context) => {
            const selection = document.getSelection()
            let node = selection.getRangeAt(0).commonAncestorContainer
            if($(node.parentNode).hasClass('start-ref')){
              this.quill.insertText(this.quill.getSelection(), '\n');
              node = selection.getRangeAt(0).commonAncestorContainer
              $(node).removeAttr('emb-ref')
              $(node).removeClass('start-ref')        
            }else if($(node).hasClass('end-ref')){
              $(node).removeClass('end-ref')   
              this.quill.insertText(this.quill.getSelection(), '\n');
              $(node).addClass('end-ref')   
            }else if($(node.parentNode).hasClass('embed')){
              this.quill.insertText(this.quill.getSelection(), '\n');
            }else if($(node.parentNode).prop("tagName") == 'DIV' && !$(node.parentNode).hasClass('ql-editor')){
              $(node.parentNode).removeAttr('class')
              this.quill.insertText(this.quill.getSelection(), '\n');
            }else{
              this.quill.insertText(this.quill.getSelection(), '\n');
            }
            if(this.is_paragraphs == true && $(node.parentNode).prop("tagName") == 'LI'){
              node.parentNode.parentNode.classList.add('embed');
            }
            if(this.is_paragraphs == true && $(node.parentNode).prop("tagName") != 'LI'){
              if(this.start_paragraphs){
                this.paragraphs_id = Api.createEmbed(this.paragraphs_title, this.$store.state.note.note_id)
                this.start_paragraphs = false
                const date = moment().format('MM/DD/YYYY')
                this.paragraphs=`<div class="embed start-ref" emb-ref="${this.paragraphs_id}">${date} - ${this.paragraphs_title}</div>`                              
                node.parentNode.classList.add('embed')
                this.paragraphs+= node.parentNode.outerHTML
                node.parentNode.classList.add('start-ref')
                node.parentNode.setAttribute('emb-ref', this.paragraphs_id)   
              }else{
                if(node.innerHTML == '<br>'){
                  node.previousSibling.classList.add('embed')
                  node.previousSibling.classList.add('end-ref')
                  this.paragraphs+= node.previousSibling.outerHTML
                  this.is_paragraphs = false
                  Api.updateEmbed(this.paragraphs_id, this.paragraphs)
                  this.paragraphs = ""
                }else{
                   node.parentNode.classList.add('embed')
                   this.paragraphs+= node.parentNode.outerHTML
                }
              }
            } 
          }
        }
      }
      let modules = {
        keyboard: {
            bindings: bindings
        },
        toolbar: this.editorToolbar
      };
      if (this.useMarkdownShortcuts) {
        Quill.register("modules/markdownShortcuts", MarkdownShortcuts, true);
        modules["markdownShortcuts"] = {};
      }
      return modules;
    },

    prepareEditorConfig(editorConfig) {
      if (
        Object.keys(this.editorOptions).length > 0 &&
        this.editorOptions.constructor === Object
      ) {
        if (
          this.editorOptions.modules &&
          typeof this.editorOptions.modules.toolbar !== "undefined"
        ) {
          
          delete editorConfig.modules.toolbar;
        }

        mergeDeep(editorConfig, this.editorOptions);
      }
    },

    registerPrototypes() {
      Quill.prototype.getHTML = function() {
        return this.container.querySelector(".ql-editor").innerHTML;
      };
      Quill.prototype.getWordCount = function() {
        return this.container.querySelector(".ql-editor").innerText.length;
      };
    },

    registerEditorEventListeners() {
      this.quill.on("text-change", this.handleTextChange);
      this.quill.on("selection-change", this.handleSelectionChange);

      this.listenForEditorEvent("text-change");
      this.listenForEditorEvent("selection-change");
      this.listenForEditorEvent("editor-change");
    },

    listenForEditorEvent(type) {
      this.quill.on(type, (...args) => {
        this.$emit(type, ...args);
      });
    },

    handleInitialContent() {
      if (this.value) this.quill.root.innerHTML = this.value; 
        setTimeout(()=>{
        $(".passive-emb").attr('contenteditable','false');
       }, 300)
    },

    handleSelectionChange(range, oldRange) {
      if (!range && oldRange) this.$emit("blur", this.quill);
      else if (range && !oldRange) this.$emit("focus", this.quill);

      if(range != null){
        if(range.length > 0 && this.quote == true){
          $(".quote-selection").remove()
          $(".quillWrapper" ).append( "<div class='quote-selection'>Quote Selection</div>" ); 
          $(".quote-selection").bind("click", (e) => {
            e.preventDefault()
            let selection = this.quill.getSelection();
            let selected_content = this.quill.getContents(selection.index, selection.length)
            this.selectQuote(selected_content)
          })
        }
      }

      if(this.$store.state.note.is_mobile){
       $( "#quill-container .ql-editor div" ).unbind( "click")
       $( "#quill-container .ql-editor div" ).bind( "click",  async(e)=>{
          e.preventDefault();  
          let tree = e.currentTarget
          if($(tree).hasClass("passive-emb")){
            while(!$(tree).hasClass('start-ref')){
              tree = tree.previousSibling
            }
            let embRef = await Api.getEmbed(tree.getAttribute("emb-ref")).then();
            let note = await Api.getNote(embRef.note_id).then();
            let data = {'content': note, 'index': note['index']};
            this.update_content = true
            this.updateContent(data);    
          }
          if($(tree).next().prop("tagName")=='UL' || $(tree).next().prop("tagName")=='LI'){
            $(tree).next().toggle();
            if($(tree).next().css('display') == 'none'){
              $(tree).attr('display', false)
            }else{
               $(tree).attr('display', true)
            }
          }
      });

       $( "#quill-container .ql-editor li" ).unbind( "click")
       $( "#quill-container .ql-editor li" ).bind( "click",  function(e){
          e.preventDefault();  
          let tree = this
          let is_display = true;

          const className = $(tree).attr('class')

          if(typeof $(tree).attr('class') === 'undefined'){
            if(typeof $(tree).next().attr('class') !== 'undefined'){
              if($(tree).attr('display') != 'false'){
                is_display = false
                $(tree).attr('display', false)
              }else{
                $(tree).attr('display', true)
              }
            }
          }else{
            if(typeof $(tree).next().attr('class') !== 'undefined'){
              if($(tree).next().attr('class').slice(-1)>$(tree).attr('class').slice(-1)){
                if($(tree).attr('display') != 'false'){
                  is_display = false
                  $(tree).attr('display', false)
                }else{
                  $(tree).attr('display', true)
                }
              }
            }
          }
            
          if(typeof className === 'undefined'){
            while(typeof $(tree).next().attr('class') !== 'undefined'){
              if(typeof $(tree).next().attr('class') !== 'undefined'){
                  if(is_display){
                    if($(tree).next().attr('display') == 'false'){
                      $(tree).next().css('display', 'block')

                      let nextTree = $(tree).next()
                      let nextLevel =  $(nextTree).attr('class').slice(-1);
                      
                      while(typeof $(nextTree).next().attr('class') !== 'undefined'){
                          let theNextTree = nextTree.next()
                          let theNextTreeLevel = $(theNextTree).attr('class').slice(-1)
                          if(theNextTreeLevel>nextLevel){
                            $(theNextTree).css('display', 'none')
                            tree = nextTree
                            nextTree = theNextTree    
                          }else{
                            break;
                          }
                      }
                    }else{
                      $(tree).next().css('display', 'block')
                    }
                  }else{
                    $(tree).next().css('display', 'none')
                  }
                  tree = $(tree).next()
              }else{
                break;
              }
            }
          }else{  
            const treeLevel = $(tree).attr('class').slice(-1);
            while(typeof $(tree).attr('class') !== 'undefined'){
              if(typeof $(tree).next().attr('class') !== 'undefined'){
                if($(tree).next().attr('class').slice(-1)>treeLevel){
                  if(is_display){
                    if($(tree).next().attr('display') == 'false'){
                      $(tree).next().css('display', 'block')

                      let nextTree = $(tree).next()
                      let nextLevel =  $(nextTree).attr('class').slice(-1);
                      
                      while(typeof $(nextTree).next().attr('class') !== 'undefined'){
                          let theNextTree = nextTree.next()
                          let theNextTreeLevel = $(theNextTree).attr('class').slice(-1)
                          if(theNextTreeLevel>nextLevel){
                            $(theNextTree).css('display', 'none')
                            tree = nextTree
                            nextTree = theNextTree    
                          }else{
                            break;
                          }
                      }
                    }else{
                      $(tree).next().css('display', 'block')
                    }
                  }else{
                    $(tree).next().css('display', 'none')
                  }
                  tree = $(tree).next()
                }else{
                  break;
                }
              }else{
                break;
              }
            }
          }
        });
      }else{
       $( "#quill-container .ql-editor div" ).unbind( "dblclick")
       $( "#quill-container .ql-editor div" ).bind( "dblclick",  async(e)=>{
          e.preventDefault();  
          let tree = e.currentTarget
          if($(tree).hasClass("passive-emb")){
            while(!$(tree).hasClass('start-ref')){
              tree = tree.previousSibling
            }
            let embRef = await Api.getEmbed(tree.getAttribute("emb-ref")).then()
            let note = await Api.getNote(embRef.note_id).then();

            let data = {'content': note, 'index': note['index']};
            this.update_content = true
            this.updateContent(data);
          }
          if($(tree).next().prop("tagName")=='UL' || $(tree).next().prop("tagName")=='LI'){
            $(tree).next().toggle();
            if($(tree).next().css('display') == 'none'){
              $(tree).attr('display', false)
            }else{
               $(tree).attr('display', true)
            }
          }
      });
       $( "#quill-container .ql-editor li" ).unbind( "dblclick")
       $( "#quill-container .ql-editor li" ).bind( "dblclick",  function(e){
          e.preventDefault();  
          let tree = this
          let is_display = true;

          const className = $(tree).attr('class')

          if(typeof $(tree).attr('class') === 'undefined'){
            if(typeof $(tree).next().attr('class') !== 'undefined'){
              if($(tree).attr('display') != 'false'){
                is_display = false
                $(tree).attr('display', false)
              }else{
                $(tree).attr('display', true)
              }
            }
          }else{
            if(typeof $(tree).next().attr('class') !== 'undefined'){
              if($(tree).next().attr('class').slice(-1)>$(tree).attr('class').slice(-1)){
                if($(tree).attr('display') != 'false'){
                  is_display = false
                  $(tree).attr('display', false)
                }else{
                  $(tree).attr('display', true)
                }
              }
            }
          }
            
          if(typeof className === 'undefined'){
            while(typeof $(tree).next().attr('class') !== 'undefined'){
              if(typeof $(tree).next().attr('class') !== 'undefined'){
                  if(is_display){
                    if($(tree).next().attr('display') == 'false'){
                      $(tree).next().css('display', 'block')

                      let nextTree = $(tree).next()
                      let nextLevel =  $(nextTree).attr('class').slice(-1);
                      
                      while(typeof $(nextTree).next().attr('class') !== 'undefined'){
                          let theNextTree = nextTree.next()
                          let theNextTreeLevel = $(theNextTree).attr('class').slice(-1)
                          if(theNextTreeLevel>nextLevel){
                            $(theNextTree).css('display', 'none')
                            tree = nextTree
                            nextTree = theNextTree    
                          }else{
                            break;
                          }
                      }
                    }else{
                      $(tree).next().css('display', 'block')
                    }
                  }else{
                    $(tree).next().css('display', 'none')
                  }
                  tree = $(tree).next()
              }else{
                break;
              }
            }
          }else{  
            const treeLevel = $(tree).attr('class').slice(-1);
            while(typeof $(tree).attr('class') !== 'undefined'){
              if(typeof $(tree).next().attr('class') !== 'undefined'){
                if($(tree).next().attr('class').slice(-1)>treeLevel){
                  if(is_display){
                    if($(tree).next().attr('display') == 'false'){
                      $(tree).next().css('display', 'block')

                      let nextTree = $(tree).next()
                      let nextLevel =  $(nextTree).attr('class').slice(-1);
                      
                      while(typeof $(nextTree).next().attr('class') !== 'undefined'){
                          let theNextTree = nextTree.next()
                          let theNextTreeLevel = $(theNextTree).attr('class').slice(-1)
                          if(theNextTreeLevel>nextLevel){
                            $(theNextTree).css('display', 'none')
                            tree = nextTree
                            nextTree = theNextTree    
                          }else{
                            break;
                          }
                      }
                    }else{
                      $(tree).next().css('display', 'block')
                    }
                  }else{
                    $(tree).next().css('display', 'none')
                  }
                  tree = $(tree).next()
                }else{
                  break;
                }
              }else{
                break;
              }
            }
          }
        });
      }     
    },

    handleTextChange() {
       const selection = document.getSelection()
       if(selection.anchorNode != null){
          $(".auto-action").remove()
          $(".auto-notebook").remove()
          let node = selection.getRangeAt(0).commonAncestorContainer
          let tree = node.parentNode
          if($(tree).hasClass('embed')){
            this.paragraphs = tree.outerHTML
            do{
              tree = tree.previousSibling                
              this.paragraphs = tree.outerHTML + this.paragraphs
            }while(!$(tree).hasClass('start-ref'))
            
            this.paragraphs_id = $(tree).attr('emb-ref')
            tree = node.parentNode.nextSibling
            while(!$(tree).hasClass('end-ref') &&  tree != null){ 
               this.paragraphs = this.paragraphs + tree.outerHTML
               tree = tree.nextSibling
            }
            Api.updateEmbed(this.paragraphs_id, this.paragraphs)
            
          }else if($(tree).prop("tagName") == 'DIV' && typeof $(tree).attr("class") == 'undefined'){
             let match_actions = []
             for(let i=0, j=0; i<ACTIONS.length; i++){
                if(ACTIONS[i].toLowerCase().indexOf(tree.innerText.toLowerCase()) == 0){
                  match_actions.push(ACTIONS[i])
                }
             }
                     
            if(match_actions.length >0){
              $(".quillWrapper" ).append( "<div class='auto-action'></div>" ); 
              for(let i = 0; i < match_actions.length; i ++){
                $(".auto-action").append('<span>'+match_actions[i]+'</span>');
              }
              $(".auto-action span").bind("click", (e)=> {
                e.preventDefault()
                const selection = document.getSelection()
                const node = selection.getRangeAt(0).commonAncestorContainer
                const tree = node.parentNode
                if(EMBED.includes(e.currentTarget.innerText) == true){
                  this.is_paragraphs = true;
                  this.start_paragraphs = true;
                }
                $(tree).addClass('action')
                if(this.quill.getSelection() != null){
                  const start = this.quill.getSelection().index-selection.getRangeAt(0).startOffset
                  if(start == 0){
                    this.quill.updateContents([
                      {delete: tree.innerText.length},
                      {insert: e.currentTarget.innerText+':'}
                    ] 
                    );
                  }else{
                    this.quill.updateContents([
                      {retain: this.quill.getSelection().index-selection.getRangeAt(0).startOffset},
                      {delete: tree.innerText.length},
                      {insert: e.currentTarget.innerText+':'}
                    ] 
                    );
                  } 
                }
              })
            }
          }else if($(tree).attr('class')=='action' && node.parentNode.innerText.split(':')[1] != null){
             let matched_notebooks = []
             for(let i=0, j=0; i<NOTEBOOKS.length; i++){
                if(NOTEBOOKS[i].name.toLowerCase().indexOf(node.parentNode.innerText.split(':')[1].toLowerCase()) == 0){
                  matched_notebooks.push(NOTEBOOKS[i])
                }
             }
            
             for(let i = 1; i < matched_notebooks.length; i ++){
                for(let j=0; j<i; j++){
                  if(matched_notebooks[j].hit_count<matched_notebooks[i].hit_count){
                    const temp = matched_notebooks[i]
                    matched_notebooks[i] = matched_notebooks[j]
                    matched_notebooks[j] = temp
                  }
                }
              } 

            if(matched_notebooks.length >0){
              $(".quillWrapper" ).append( "<div class='auto-notebook'></div>" ); 
              for(let i = 0; i < matched_notebooks.length; i ++){
                $(".auto-notebook").append(`<span key="${matched_notebooks[i].key}">`+matched_notebooks[i].name+`</span>`);
              }
              $(".auto-notebook span").bind("click", (e)=> {
                e.preventDefault()
                const selection = document.getSelection()
                const node = selection.getRangeAt(0).commonAncestorContainer
                const tree = node.parentNode
                const key = e.currentTarget.getAttribute('key')
                this.$store.state.note.notebooks[key].hit_count +=1;
                $(tree).removeClass('action').addClass('notebook')
                $(".auto-notebook").remove()
                if(this.is_paragraphs){
                  this.paragraphs_title = tree.innerText.split(':')[0]+':'+e.currentTarget.innerText
                }
                if(this.quill.getSelection()!= null){
                const start = this.quill.getSelection().index-selection.getRangeAt(0).startOffset
                  if(start == 0){
                    this.quill.updateContents([
                      {delete: tree.innerText.length},
                      {insert: tree.innerText.split(':')[0]+':'+e.currentTarget.innerText+': '}
                    ]);
                  }else{
                    this.quill.updateContents([
                      {retain: this.quill.getSelection().index-selection.getRangeAt(0).startOffset},
                      {delete: tree.innerText.length},
                      {insert: tree.innerText.split(':')[0]+':'+e.currentTarget.innerText+': '}
                    ]);
                  }
                }
              })
            }
          }
       }

      let editorContent = this.quill.getHTML() === "<div><br></div>" ? "" : this.quill.getHTML();
      this.$emit("input", editorContent);
    },

    checkForCustomImageHandler() {
      this.useCustomImageHandler === true ? this.setupCustomImageHandler() : "";
    },

    setupCustomImageHandler() {
      let toolbar = this.quill.getModule("toolbar");
      toolbar.addHandler("image", this.customImageHandler);
    },

    customImageHandler(image, callback) {
      this.$refs.fileInput.click();
    },

    emitImageInfo($event) {
      const resetUploader = function() {
        var uploader = document.getElementById("file-upload");
        uploader.value = "";
      };
      let file = $event.target.files[0];
      let Editor = this.quill;
      let range = Editor.getSelection();
      let cursorLocation = range.index;
      this.$emit("imageAdded", file, Editor, cursorLocation, resetUploader);
    }
  }
};
</script>
<style lang="scss">
.auto-action{
    position: absolute;
    z-index: 2;
    top: calc(60vh - 45px);
    width: 100%;
    background: #e3e3e3;
    height: 45px;
    overflow-x: auto;
    display: flex;
    border: solid 1px #ddd;
    padding-left: 5px;

    span{
      font-size: 1.5em;
      margin-top: 10px;
      display: block;
      padding: 0px 5px;
      cursor: pointer;
      user-select: none;
      min-width: fit-content;
      margin-right: 15px;
    }
    span:first-child {
      font-weight: 600;
    }
}
.auto-notebook{
    position: absolute;
    z-index: 2;
    top: calc(60vh - 45px);
    width: 100%;
    background: #e3e3e3;
    height: 45px;
    overflow-x: auto;
    display: flex;
    border: solid 1px #ddd;
    padding-left: 5px;

    span{
      font-size: 1.5em;
      margin-top: 10px;
      display: block;
      padding: 0px 5px;
      cursor: pointer;
      user-select: none;
      min-width: fit-content;
      margin-right: 15px;
    }
    span:first-child {
      font-weight: 600;
    }
}
.quote-selection{
    position: absolute;
    bottom: 10px;
    display: block;
    color: black;
    font-size: 19px;
    font-weight: 700;
    background-color: #50e3c2;
    width: 300px;
    height: 40px;
    user-select: none;
    text-align: center;
    padding-top: 6px;
    border-radius: 5px;
    left: calc(50% - 150px);
}
.quote{
  border-right: 2px solid #a4a0a0b0;
  border-left: 2px solid #a4a0a0b0;
  padding: 0px 5px;
  margin: 0px 10px;
}
.quote-start{
  border-top: 2px solid #a4a0a0b0;
  border-radius: 5px 5px 0px 0px;
}
.quote-end{
  border-bottom: 2px solid #a4a0a0b0;
  border-radius: 0px 0px 5px 5px;
}
</style>

<style src="quill/dist/quill.snow.css"></style>
<style src="../../assets/scss/vue2-editor.scss" lang="scss"></style>
