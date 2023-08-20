import { useEffect, useState } from 'react';
import * as s from './styles';
import { fabric } from 'fabric';
import { Demo } from '../../ColorPicker';


export const TextTab = ({ canvas }) => {
  const [color, setColor] = useState('#6979ffff');
  
  // 폰트 변경
  const [selectedFont, setSelectedFont] = useState('(default)Times New Roman');
  const fonts = ['Black Han Sans', 'Noto Sans Korean','Noto Sans Korean(bold)', 'Orbit'];
  fonts.unshift('(default)Times New Roman');

    useEffect(() => {
        const select = document.getElementById('font-family');
        select.innerHTML = '';

        fonts.forEach(font => {
            const option = document.createElement('option');
            option.innerHTML = font;
            option.value = font;
            select.appendChild(option);
        });


  let fonts = ["Black Han Sans", "Noto Sans Korean", "Orbit"];

  const AddDate = () => {
    // 캔버스에 텍스트 추가될 때 디폴트로 표시될 날짜 포맷팅 함수
    const formatDate = (date) => {
      const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
      return new Intl.DateTimeFormat('ko-KO', options).format(date);
    };
    // 날짜 년월일로 표시해주는 포맷팅 함수
    const currentDate = new Date();
    //오늘 날짜

    if (canvas) {
      let text = new fabric.IText(formatDate(currentDate), {
        fill: textColor,
        editable: true,
        hasControls: true,
        class: 'date',
      });
      text.set('selectable', true);
      canvas.add(text);
    }
  };
  

  
  const AddText = () => {
    if (canvas) {
      let text = new fabric.IText('double click!', {
        fill: color,
        editable: true,
        hasControls: true,
        class: 'text',
      });
      text.set('selectable', true);
      canvas.add(text);
    }
  };

  // const FixImage = () => {
  //   if (
  //     canvas.getActiveObject() &&
  //     canvas.getActiveObject() instanceof fabric.Image
  //   ) {
  //     // console.log(canvas.getActiveObject()._element.currentSrc);
  //     console.log(canvas.getActiveObject());
  //     let imag = canvas.getActiveObject()._element.currentSrc;
  //     // let imagAngle = canvas.getActiveObject.angle;
  //     let imagACoords = canvas.getActiveObject().oCoords;
  //     let imagWidth = canvas.getActiveObject().width;
  //     let imagHeight = canvas.getActiveObject().height;
  //     let imagScaleX = canvas.getActiveObject().scaleX;
  //     let imagScaleY = canvas.getActiveObject().scaleY;
  //     let imagLeft = canvas.getActiveObject().left;
  //     let imagTop = canvas.getActiveObject().top;
  //     fabric.Image.fromURL(imag, (imgFile) => {
  //       imgFile.aCoords = imagACoords;
  //       imgFile.scaleToWidth(imagWidth * imagScaleX);
  //       imgFile.scaleToHeight(imagHeight * imagScaleY);
  //       imgFile.left = imagLeft;
  //       imgFile.top = imagTop;
  //       //imgFile.angle = 0;
  //       imgFile.hasControls = false;
  //       imgFile.hasBorders = false;
  //       imgFile.lockMovementX = true;
  //       imgFile.selectable = false;
  //       imgFile.evented = false;
  //       imgFile.sendToBack();

  //       canvas.add(imgFile);
  //       canvas.renderAll();
  //     });
  //   }
  // };

  const FixText = () => {
    if (
      canvas.getActiveObject() &&
      (canvas.getActiveObject() instanceof fabric.Text ||
        canvas.getActiveObject() instanceof fabric.IText)
    ) {
      let textSelected = canvas.getActiveObject();
      // const textSelectedText = textSelected.text;
      console.log(canvas.getActiveObject());
      textSelected.hasControls = false;
      textSelected.hasBorders = false;
      textSelected.lockMovementX = true;
      textSelected.lockMovementY = true;
      textSelected.selectable = false;
      textSelected.editable = false;
      textSelected.evented = false;
    }
  };

  const ChangeTextColor = () => {
    if (
      canvas.getActiveObject() &&
      (canvas.getActiveObject() instanceof fabric.Text ||
        canvas.getActiveObject() instanceof fabric.IText)
    ) {
      console.log(canvas.getActiveObject());
      let text = canvas.getActiveObject();
      text.set('fill', color); // Update the fill property directly
      text.setCoords(); // Update the object's coordinates
      canvas.renderAll(); // Render the canvas
      console.log(text);

      canvas.requestRenderAll();
      console.log('rendered');
    }
  };

  const TextBackgroundColor = () => {
    if (
      canvas.getActiveObject() &&
      (canvas.getActiveObject() instanceof fabric.Text ||
        canvas.getActiveObject() instanceof fabric.IText)
    ) {
      console.log(canvas.getActiveObject());
      let text = canvas.getActiveObject();
      text.set('textBackgroundColor', color); // Update the fill property directly
      text.setCoords(); // Update the object's coordinates
      canvas.renderAll(); // Render the canvas
      console.log(text);

      canvas.requestRenderAll();
      console.log('rendered');
    }
  };

  const TextBrush = () => {
    if(canvas){
    
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush({ decimate: 8 });

      canvas.on('path:created', function (opt) {
        if (canvas.isDrawingMode) {
          let path = opt.path;
          let pathInfo = fabric.util.getPathSegmentsInfo(path.path);
          path.segmentsInfo = pathInfo;
  
          let pathLength = pathInfo[pathInfo.length - 1].length;
          let text =
            'this is a demo of text on a path. This text should be small enough to fit in what you have drawn';
          let fontSize = (2.5 * pathLength) / text.length;
          text = new fabric.Text(text, {
            fontSize,
            path,
            top: path.top,
            left: path.left,
          });
  
          canvas.add(text);
          canvas.remove(path);
          canvas.isDrawingMode = false;
        }
      });
    }
    
  };

  const TextFonts = () => {
    if (
      canvas.getActiveObject() instanceof fabric.Text ||
      canvas.getActiveObject() instanceof fabric.IText
    ) {
      let fontFamily = '';
      let fontWeight = 400; // Default font-weight value
  
      if (selectedFont === 'Black Han Sans') {
        fontFamily = "'Black Han Sans', sans-serif";
      } else if (selectedFont === 'Noto Sans Korean') {
        fontFamily = "'Noto Sans KR', sans-serif";
      } else if(selectedFont ==='Noto Sans Korean(bold)'){
        fontFamily = "'Noto Sans KR', sans-serif";
        fontWeight = 700;
      }
      else if(selectedFont ==='Orbit') {
        fontFamily = "'Orbit', sans-serif";
      }else if(selectedFont ==='(default)Times New Roman'){
        fontFamily = "'Times New Roman', sans-serif";
      }

      canvas.getActiveObject().set({
        fontFamily,
        fontWeight
      });
  
      canvas.renderAll();
      console.log(canvas.getActiveObject());
      console.log(fontFamily, fontWeight);
    }
  };


  return (
    <>
      <s.ContainerText>
        <s.BtnAddText onClick={AddText}>텍스트 추가</s.BtnAddText>
        <s.BtnAddText onClick={AddDate}>날짜 추가</s.BtnAddText>
        <Demo color={color} setColor={setColor} />
        <s.BtnChangeColor onClick={ChangeTextColor}>
          색깔 적용하기
        </s.BtnChangeColor>
        <s.BtnBackgroundColor onClick={TextBackgroundColor}>배경색 넣기</s.BtnBackgroundColor>
        <s.BtnFixText onClick={FixText}>선택한 텍스트 고정</s.BtnFixText>
        {/* <s.BtnFixImage onClick={FixImage}>선택한 이미지 고정</s.BtnFixImage> */}
        <s.BtnDrawText onClick={TextBrush}>텍스트 그리기</s.BtnDrawText>
        <select id="font-family" onChange={(e) => setSelectedFont(e.target.value)} value={selectedFont}>
            {/* Options will be added dynamically through the useEffect */}
        </select>
        <s.BtnFontChange onClick={TextFonts}>apply</s.BtnFontChange>
      </s.ContainerText>
    </>
  );
};
