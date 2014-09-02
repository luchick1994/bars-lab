/**
 * hulk - библиотека для манипуляции DOMом.
 * Ниже описаны функции, которые должны присутствовать в данной библиотеке.
 * Реализовать hulk таким образом, чтобы можно было вызывать цепочку функций:
 * @example hulk.select('some-selector').addClass('cls').append('div')
 */
var hulk = (function(){
    function Hulker(elements){
        this.elements = elements;
    }
// 
/**
 * @method select
 * Функция, с которой начинается манипуляция dom-объектов.
 * Возвращает hulk-объект, который содержит массив html-элементов, удовлетворяющих переданному селектору.
 * Все дальнейшие манипуляции из цепочки вызовов будут применены к элементам из данной выборки.
 * @param {String} selector css-селектор.
 */
    Hulker.select = function(selector){
        return new Hulker(document.querySelectorAll(selector));
    }
/**
 * @method addClass
 * Добавляет классы каждому элементу выборки.
 * @param {String} clsNames Имена классов, разделенных пробелом.
 */
    Hulker.prototype.addClass = function(clsNames){
        var i;
        for (i = 0; i < this.elements.length; i++){
            this.elements[i].classList.add(clsNames);
        }
    }
/**
 * @method append
 * Добавляет дочерний html-элемент каждому элементу выборки.
 * @param {String} Имя тега, добавляемого элемента.
 */
    Hulker.prototype.append = function(tagName){
        var i, child;
        child = document.createElement(tagName);
        for (i = 0; i < this.elements.length; i++){
            this.elements[i].appendChild(child);
        }
    }
/**
 * @method attr Если при вызове передается один аргумент, возвращается значение атрибута,
 * если передается два аргумента, то атрибуту присваивается значение второго аргумента.
 * @param {String} attrName Имя атрибута.
 * @param {Number/String} [value] Значение атрибута.
 */
    Hulker.prototype.attr = function(attrName, value){
        if (typeof (value) != 'undefined') {
            var i;
            for (i = 0; i < this.elements.length; i++){
                this.elements[i].setAttribute(attrName,value);
            }
        }
        return this.elements[0].getAttribute(attrName);
    }
/**
 * @method children
 * Возвращает всех непосредственных наследников первого элемента из выборки, обернутых в hulk-объект.
 */
    Hulker.prototype.children = function(){
        return new Hulker(this.elements[0].children);
    }
/**
 * @method css Если при вызове передается один аргумент, возвращается значение css-атрибута,
 * если передается два аргумента, то css-атрибуту присваивается значение второго аргумента.
 * @param {String} cssAttrName Имя css-атрибута.
 * @param {Number/String} value Значение css-атрибута.
 */
    Hulker.prototype.css = function (cssAttrName, value) {
        if (typeof (value) != 'undefined') {
            var i;
            for (i = 0; i < this.elements.length; i++){
                this.elements[i].css[cssAttrName] = value;
            }
        }
        return this.elements[0].css[cssAttrName];
    };
/**
 * @method empty
 * Очищает все внутреннее содержимое элементов из выборки.
 */
    Hulker.prototype.empty = function(){
        var i;
        for (i = 0; i < this.elements.length; i++){
            this.elements[i].innerHTML = "";
        }
    }
/**
 * @method find
 * Производит выборку по дочерним элементам выборки, удовлетворяющим переданному селектору.
 * @param {String} selector css-селектор для выборки.
 */
    Hulker.prototype.find = function(selector){
        var i, newElements;
        for (i = 0; i < this.elements.length; i++){
            newElements[i] = this.elements[i].querySelectorAll(selector);
        }
        return newElements;
    }
/**
 * @method hasClass
 * Проверяет наличие класса для элементов выборки.
 * @param {String} className Имя класса, наличие которого проверяется.
 * @return {Boolean} Возвращает true, если все элементы выборки содержат переданный класс.
 */
    Hulker.prototype.hasClass = function(className){
        var classDone, i;
        classDone= true;
        for (i = 0; i < this.elements.length; i++){
            classDone = (this.elements[i].classList.contains(className))&&classDone;
        }
        return classDone;
    }
/**
 * @method html
 * Возвращает html-содержимое первого элемента выборки.
 * @return {HTMLElement} html-содержимое первого элемента из выборки.
 */
    Hulker.prototype.html = function(){
        return this.elements[0].innerHTML;
    }
/**
 * @method on
 * Добавляет подписчика на событие для элементов выборки.
 * @param {String} eventName Имя события, на которое будет производиться подписка.
 * @param {Function} func Функция-подписчик.
 */
    Hulker.prototype.on = function(eventName, func){
        var i;
        for (i = 0; i < this.elements.length; i++){
            this.elements.addEventListener(eventName, func);
        }
    }
/**
 * @method parent
 * Возвращает родительский элемент первого элемента выборки.
 */
    Hulker.prototype.parent = function(){
        return this.elements[0].parentNode;
    }
/**
 * @method remove
 * Удаляет из документа все DOM-элементы выборки.
 */
    Hulker.prototype.remove = function(){
        var i;
        for (i = 0; i < this.elements.length; i++){
            this.elements[i].parentNode.removeChild(this.elements[i]);
        }
    }
/**
 * @method removeAttr
 * Удаляет атрибут из элементов выборки.
 * @param {String} attrName Удаляемый атрибут.
 */
    Hulker.prototype.removeAttr = function(attrName){
        var i;
        for (i = 0; i < this.elements.length; i++){
            this.elements[i].removeAttribute(attrName);
        }
    }
/**
 * @method removeClass
 * Удаляет css-классы для элементов выборки.
 * @param {String} clsNames Имена классов, разделенных пробелом.
 */
    Hulker.prototype.removeClass = function(clsNames){
        var i, j,classes;
        classes = clsNames.split(" ");
        for (i = 0; i < this.elements.length; i++){
            for (j = 0; j < classes.length; j++){
                this.elements[i].classList.remove(classes[j]);
            }
        }
    }
/**
 * @method toggleClass
 * Добавляет (если классы отсутствуют) и удаляет (если классы присутствуют) у элементов выборки.
 * @param {String} clsNames Имена классов, разделенных пробелом.
 */
    Hulker.prototype.toggleClass = function(clsNames){
        var i, j, classss;
        classss = clsNames.split(" ");
        for (i = 0; i < this.elements.length; i++){
            for (j = 0; j < classss.length; j++){
                if (this.elements.classList.contains(classss[j])) {
                    this.elements.classList.remove(classss[j])
                } else {
                    this.elements.classList.add(classss[j]);
                }
            }
        }
    }
/**
 * @method unbind
 * Удаляет подписчика на событие для элементов выборки.
 * @param {String} eventName Имя события, для которого будет производиться удаление подписчика.
 * @param {Function} func Удаляемая функция-подписчик.
 */
    Hulker.prototype.unbind = function(eventName, func){
        var i;
        for (i = 0; i < this.elements.length; i++){
            this.elements.removeEventListener(eventName, func);
        }
    }
/**
 * @method wrap
 * Оборачивает каждый элемент выборки тегом, имя которого передано в качестве первого аргумента.
 * @param {String} tagName Имя тега.
 */
    Hulker.prototype.wrap = function(tagName) {
        var newElement,i;
        newElement = document.createElement(tagName);
        for (i = 0; i < this.elements.length; i++){
            var copyelements = this.elements[i].cloneNode(true);
            this.elements[0] = newElement.cloneNode(false);
            this.elements[0].appendChild(copyelements);
        }
    }
    return Hulker;
})();
