<template>
  <div class="mobile-container paddingbottom70">
    <vue-editor
      v-model="content"
      use-markdown-shortcuts
      :editor-options="editorOptions"
    >
      <div id="my-toolbar" slot="toolbar">
        <span class="ql-formats">
          <select class="ql-header" defaultValue="0">
            <option value="1">Heading</option>
            <option value="2">Subheading</option>
            <option value="0">Normal</option>
          </select>
          <select class="ql-font">
            <option></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
        </span>
        <span class="ql-formats">
          <select class="ql-color"></select>
          <select class="ql-background"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <select class="ql-align">
            <option defaultValue></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-image"></button>
          <button class="ql-code-block"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      </div>
    </vue-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editorOptions: {
        modules: {
          toolbar: "#my-toolbar"
        },
        placeholder: "new placeholder text here ..."
      },
      content: "value"
    };
  },

  methods: {
    handleTextChange(obj) {
      console.log("TCL: handleTextChange -> obj", obj);
    }
  }
};
</script>

<style lang="scss">
</style>
