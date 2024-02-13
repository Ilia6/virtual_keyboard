const Keyboard = {
    element:{
        main: null,
        keysCounter:null,
        keys: []
    },

    eventHandlers:{
        oninput: null,
        onclose: null
    },
    properies:{
        value: "",
        capsLock: false
    },

    inIt(){
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");


        this.elements.main.classList.add('keyboard', '1keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.element.keysContainer.appendChild(this._createKeys());

        this.element.keys = this.elements.keysContainer.querrySelectorAll('.keyboard__key');


        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        const createIconHTML = (icon_name) => {
            return '<i class="material-icons">${icon_name}</i>';
        }
        keyLayout.forEach(key =>{
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace','p','enter','?'].indexOf(key) !== -1;

            keyElement.setAttribute('type','button');
            keyElement.classList.add('keyboard__key');


            switch(key){
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click' , () => {
                        this.properies.value = this.properies.value.substring(0 , this.properies.value.length - 1);
                        this._triggerEvent("oninput");
                    })

                    break;

                    case 'caps':
                    keyElement.classList.add('keyboard__key--wide' , 'keyboard__key--activatable');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');

                    keyElement.addEventListener('click' , () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properies.capsLock)
                    })

                    break;


                    case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click' , () => {
                        this.properies.value += "\n";
                        this._triggerEvent("oninput");
                    })

                    break;

                    case 'done':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click' , () => {
                        this.close();
                        this._triggerEvent("onclose");
                    })

                    break;

                    default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click' , () => {
                        this.properies.value += this.properies.capsLock ? key.toUpdate() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    })

                    break;
            }

            fragment.appendChild(keyElement);

            if(insertLineBreak){
                fragment.appendChild(document.createElement('br'));
            }
        })

        return fragment;
    },

    _triggerEvent(handlerName){
        console.log('Event Triggered! Event Name: ' + handlerName);
    },

    toggelCapslock(){
       this.properies.capsLock = !this.properies.capsLock;

       for( const key of this.element.keys){
            if(key.childElementCount === 0){
                key.textContent = this.properies.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
       }
    },

    open(iniyiaValue, oninput, onclose){

    },

    close(){

    }
};

window,addEventListener("DOMContentLoaded", function(){
    Keyboard.inIt();
})
