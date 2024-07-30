import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EventHandler } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events";

interface Props {
  handleEditorChange: EventHandler<any>;
  value?: string;
  initial?: string;
}
const TinyMCE: React.FC<Props> = ({
  handleEditorChange,
  value,
  initial = "",
}) => {
  return (
    <Editor
      initialValue={initial}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste imagetools wordcount",
        ],
        toolbar:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor",
        // selector: "textarea",
      }}
      onChange={handleEditorChange}
      value={value}
    />
  );
};

export default TinyMCE;
