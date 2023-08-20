import * as s from './styles';
import 'fabric-history';
import { SelectSizePage } from '../SelectSizePage';

// eslint-disable-next-line react/prop-types
export const ButtonGroupContainer = ({ handleChangedFile, fileInputRef, canvas }) => {

  // var current;
  // var list = [];
  // var state = [];
  // var index = 0;
  // var index2 = 0;
  // var action = false;
  // var refresh = true;

  // canvas.on("object:added", function (e) {
  //     var object = e.target;
  //     // console.log('object:modified');

  //     if (action === true) {
  //         state = [state[index2]];
  //         list = [list[index2]];

  //         action = false;
  //         // console.log(state);
  //         index = 1;
  //     }
  //     object.saveState();

  //     // console.log(object.originalState);
  //     state[index] = JSON.stringify(object.originalState);
  //     list[index] = object;
  //     index++;
  //     index2 = index - 1;



  //     refresh = true;
  // });

  // canvas.on("object:modified", function (e) {
  //     var object = e.target;
  //     // console.log('object:modified');

  //     if (action === true) {
  //         state = [state[index2]];
  //         list = [list[index2]];

  //         action = false;
  //         // console.log(state);
  //         index = 1;
  //     }

  //     object.saveState();

  //     state[index] = JSON.stringify(object.originalState);
  //     list[index] = object;
  //     index++;
  //     index2 = index - 1;

  //     // console.log(state);
  //     refresh = true;
  // });

  // function undo() {

  //     if (index <= 0) {
  //         index = 0;
  //         return;
  //     }

  //     if (refresh === true) {
  //         index--;
  //         refresh = false;
  //     }

  //     console.log('undo');

  //     index2 = index - 1;
  //     current = list[index2];
  //     console.log("index2",index2);
  //     console.log("state", state)
  //     current.setOptions(JSON.parse(state[index2]));
      

  //     index--;
  //     current.setCoords();
  //     canvas.renderAll();
  //     action = true;
  // }

  // function redo() {

  //     action = true;
  //     if (index >= state.length - 1) {
  //         return;
  //     }

  //     console.log('redo');

  //     index2 = index + 1;
  //     current = list[index2];
  //     current.setOptions(JSON.parse(state[index2]));

  //     index++;
  //     current.setCoords();
  //     canvas.renderAll();
  // }

  const Undo = () =>{
    if(canvas){
      canvas.undo();
      canvas.renderAll();

    }

  };

  const Redo = ()=>{
    if(canvas){
      canvas.redo();
      canvas.renderAll();
    }
  };

  const RemoveAll = () => {
    if(canvas){
      canvas.remove(...canvas.getObjects());
      canvas.backgroundImage = null;
    }
  };

  const ReturnToSelect = () => {
    return(
      <>
        <SelectSizePage
          isClickedOk={isClickedOk}
          selectCanvasSize={selectCanvasSize}
        />
      </>
      
    )
  };


  return (
    <>
    <s.ButtonGroupWrapper>
      <s.Container>
        <s.ImageLoadButton htmlFor='file'>
          <s.ImageLoadButtonLabel htmlFor='file'>
            이미지 불러오기
          </s.ImageLoadButtonLabel>
          <s.Input
            type='file'
            id='file'
            onChange={handleChangedFile}
            ref={fileInputRef}
          />
        </s.ImageLoadButton>
        <s.Button>저장하기</s.Button>
        <s.Button>내 이미지 보기</s.Button>
        <s.Button onClick = {Undo} canvas={canvas}>←</s.Button>
        <s.Button onClick = {Redo} canvas={canvas}>→</s.Button>
        <s.Button onClick = {RemoveAll} canvas={canvas}>모두 지우기</s.Button>
        <s.Button onClick = {ReturnToSelect}>폴라로이드 크기 다시 선택하기</s.Button>
      </s.Container>
      </s.ButtonGroupWrapper>
    </>
  );
};
