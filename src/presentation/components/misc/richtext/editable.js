import React from "react";
import MUIRichTextEditor from "mui-rte";
// import {
// //   EditorState,
//   convertToRaw,
// } from "draft-js";
// import { createMuiTheme } from "@mui/core/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginBottom: 10,
        width: "100%",
      },
      container: {
        height: "100%",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: 6,
        padding: 15,
        overflow: "auto",
      },
      editorContainer: {
        position: "relative !important",
        marginBottom: 20,
        minHeight: 100,
        maxHeight: 156,
      },
    },
  },
});

const EditableRichText = (props) => {
  const { value, setValue, setError, error, setIsStartedFilling } = props;
  //   const [ed, setEd] = React.useState();

  //   // 1. Convert the HTML
  //   const contentHTML = convertFromRaw(value);
  //   // convertFromHTML(value);

  //   // 2. Create the ContentState object
  //   const state = ContentState.createFromBlockArray(
  //     contentHTML.contentBlocks,
  //     contentHTML.entityMap
  //   );

  // 3. Stringify `state` object from a Draft.Model.Encoding.RawDraftContentState object
  //   const content = convertFromRaw(JSON.parse(value));
  //   const content = EditorState.createWithContent(state);/

  React.useEffect(() => {
    // if (setIsStartedFilling)
    //Just do nothing right here...
  }, [setIsStartedFilling]);

  const handleChange = (state) => {
    // const data = JSON.stringify(convertToRaw(state.getCurrentContent()));

    if (error) {
      setError(false);
    }

    if (state.getCurrentContent().hasText()) {
      // setIsStartedFilling(true);
      //   setValue(data);
    }
  };

  const save = (data) => {
    // save this data somewhere
    console.log(data);
    setValue(data);
  };

  //   React.useEffect(() => {
  //     // const storeRaw = localStorage.getItem('draftRaw');
  //     let initialEditorState = null;

  //     if (value) {
  //       const rawContentFromStore = convertFromRaw(
  //         JSON.parse(JSON.stringify(value))
  //       );
  //       initialEditorState = EditorState.createWithContent(rawContentFromStore);
  //       //   EditorState.createWithContent(convertFromRaw(JSON.parse(rawContentState))
  //     } else {
  //       initialEditorState = EditorState.createEmpty();
  //     }

  //     setEd(initialEditorState);
  //   }, [ed, value]);
  // this.state = {
  //   editorState: initialEditorState
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <MUIRichTextEditor
              readOnly
              inlineToolbar={false}
              style={{ width: "100%", textAlign: "center" }}
              defaultValue={text}
              toolbar={false}
            /> */}
      <MUIRichTextEditor
        //   defaultValue={}
        controls={[
          "title",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "highlight",
          "undo",
          "redo",
          "link",
          "media",
          "numberList",
          "bulletList",
          "quote",
          "code",
          "clear",
          "save",
        ]}
        error={error}
        label="Type here..."
        toolbarButtonSize="small"
        inlineToolbar={true}
        onSave={save}
        onChange={handleChange}
        // value={ed}

        defaultValue={value}
      />
    </ThemeProvider>
  );
};

export default EditableRichText;
