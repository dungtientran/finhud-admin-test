import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

function CustomEditor({ handleRichText, initialData }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={!!initialData ? initialData : ""}
      onChange={(event, editor) => {
        const data = editor.getData();
        handleRichText(data);
      }}
    />
  );
}

export default CustomEditor;
