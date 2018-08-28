function Separate_Spanish_English(contents) {
    var Spanish=[];
    var English=[];
    for (let i = 0; i < contents.length; i++) {
        if(contents[i].lang=='es-mx'){
            Spanish.push(contents[i]);
        }
        else{
            English.push(contents[i]);
        }
    }
   
    var Spanish_Block=document.createElement("div");
    for (let index = 0; index < Spanish.length; index++) {
        Spanish_Block.appendChild(Spanish[index]);
    }
    Spanish_Block.classList.add("Spanish");

    var English_Block=document.createElement("div");
    for (let index = 0; index < English.length; index++) {
        English_Block.appendChild(English[index]);
    }
    English_Block.classList.add("English");
    
    var New_Passage=document.createElement('div');
    New_Passage.appendChild(Spanish_Block);
    New_Passage.appendChild(English_Block);
    return New_Passage;
 
}

function Rearrange(name){
    var Parent=document.querySelector(name);
    var Children=Parent.children;
    var New_Children=Separate_Spanish_English(Children);
    Parent.appendChild(New_Children);
}

function Check_Number(Html_Content){
    for (let i = 0; i < Html_Content.length; i++) {
        if((Html_Content[i]<'z' && Html_Content[i]>'a')||(Html_Content[i]<'Z' && Html_Content[i]>'A'))
        {
            return false;
        }
    }
    return true;
}
function Check_Img(Child){
    var nodes=Child.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        if(nodes[i].nodeName=='IMG'){
            return true;
        }
    }
    return false;
}
Passage_Name='.thePassage .padding';
Question_Name='.stemContainer';
Choice_Name='.optionContent';
if(document.querySelector(Passage_Name)!=null)
{
    Rearrange(Passage_Name);
}
else{
    var Table=document.querySelector('.bigTable');
    Table.classList.add("center");
    var Questions=document.querySelector('.theQuestions');
    Questions.style.width='100%';
}
if(document.querySelector(Question_Name)!=null)
{
    Rearrange(Question_Name);
}
var choices=document.querySelectorAll(Choice_Name);
if(choices!=null)
{
    var check=false;
    if(choices[0]!=null){
        var Children=choices[0].children;
        var Html_Content=Children[0].innerHTML;
        var check=Check_Number(Html_Content)||Check_Img(Children[0]);
        console.log(check);
    }
 
    if(check){
        for (let i = 0; i < choices.length; i++) {
            choices[i].classList.add('Number');
        }
    }
    else{
        for (let i = 0; i < choices.length; i++) {
            Rearrange('#'+choices[i].id);
        }
    }
}

var Answer_Cotainer=document.querySelector('.answerContainer .tableItem');
if(Answer_Cotainer!=null){
    var goal=document.querySelector('.stemContainer .Spanish');
    var width=goal.clientWidth;
    Answer_Cotainer.style.width=width;
}