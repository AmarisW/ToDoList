function example() {
    (function () {
        // 任务数据
        let arr = [
            {

                content: '今天要吃个大汉堡',
                done: false
            },
            {
                content: '复习本地存储的知识点',
                done: true
            },
            {
                content: '今天要吃定这个实战',
                done: false
            }
        ]

        // 获取元素
        //input 
        let title = document.querySelector('#title')
        let todolist = document.querySelector('#todolist')
        let doList = document.querySelector('#doList')
        var k = 0

        // 数据驱动视图的做法


        // 步骤
        //  1. 渲染功能
        for (let i = 0; i < arr.length; i++) {
            var text = arr[i].content
            var li = document.createElement('li')
            li.setAttribute('date_index', k);
            k++
            if (arr[i].done == false) {

                li.innerHTML = '<input type="checkbox"/><p>' + text + '</p><a href="javascript:;"></a>'
                doList.appendChild(li)

            } else if (arr[i].done == true) {
                li.classList.add('completed')
                let flag = 'checked'
                li.innerHTML = '<input type="checkbox"' + flag + '/><p >' + text + '</p><a href="javascript:;"></a>'
                todolist.appendChild(li)
            }
            todolistRemove()
          
            localStorage.setItem('content:' + arr[i].content, arr[i].done)
          

        }




        //  2. 添加功能  enter
        function _submit(e) {
            if ((e.code == 13 || e.code == 'Enter') && (title.value != '')) {
                //获取内容+内容存在数组里面
                let _content = title.value
                arr[arr.length] = { content: _content, done: false }
                // 存储
                localStorage.setItem(_content, false)

                //创建元素
                var li = document.createElement('li')
                li.setAttribute('date_index', k); k++;

                li.innerHTML = '<input type="checkbox"/><p>' + _content + '</p><a href="javascript:;"></a>'
                doList.appendChild(li);

                //调用删除事件
                todolistRemove()
                // console.log(arr, arr.length);
                change()

                //重新给title 设置为空
                title.value = '';

                function todolistRemove() {
                    li.querySelector('a').addEventListener('click', function () {
                        this.parentElement.parentElement.removeChild(this.parentElement)
                        var str = '\'' + li.querySelector('p').innerHTML + '\''
                        console.log(str);
                        localStorage.removeItem(li.querySelector('p').innerHTML)
                    })
                }


                function change() {
                    li.querySelector('input').addEventListener('click', function () {
                        if (this.checked) {
                            this.parentElement.classList.add('completed')
                            todolist.insertBefore(this.parentNode, todolist.firstElementChild)
                        } else if (!this.checked) {
                            this.parentElement.classList.remove('completed')
                            doList.insertBefore(this.parentNode, doList.firstElementChild)
                        } else {

                        }
                    })

                }

            }
        }
        document.addEventListener("keydown", _submit)



        //  3. 删除功能   a
        function todolistRemove() {
            li.querySelector('a').addEventListener('click', function () {
                this.parentElement.parentElement.removeChild(this.parentElement)
            })
        }

        //  4. 切换功能   check
        var ipts = document.querySelectorAll('input')
        function chang() {
            for (let i = 0; i < arr.length; i++) {
                ipts[i].addEventListener('click', function () {
                    if (this.checked) {
                        this.parentElement.classList.add('completed')
                        todolist.insertBefore(this.parentNode, todolist.firstElementChild)
                    } else if (!this.checked) {
                        console.log('fla');
                        this.parentElement.classList.remove('completed')
                        doList.insertBefore(this.parentNode, doList.firstElementChild)
                    }
                })
            }
        }
        chang()

        //  5. 本地存储   localstorages
        // var Str = JSON.stringify(arr);
        // localStorage.setItem('key', Str)

    })()
}




//--------方法二-----------------------------------------------------------------------

(function () {
    // 任务数据
    let arr = []
    // 获取元素
    //input 
    let title = document.querySelector('#title')
    let todolist = document.querySelector('#todolist')
    let doList = document.querySelector('#doList')
    var Str 
    //渲染函数
    //内存里面读取数据
    arr = JSON.parse(localStorage.getItem('key')) 
    function load() {
        

        //
        document.querySelectorAll('ol')[0].innerHTML = ''
        document.querySelectorAll('ol')[1].innerHTML = ''
        //date_index
        var k = 0
        for (let i = 0; i < arr.length; i++) {
            //页面重载
            var text = arr[i].content
            var li = document.createElement('li')
            li.setAttribute('date_index', k);
            k++;
            if (arr[i].done == false) {
                li.innerHTML = '<input type="checkbox"/><p>' + text + '</p><a href="javascript:;"></a>'
                doList.appendChild(li)

            } else if (arr[i].done == true) {
                li.classList.add('completed')
                let flag = 'checked'
                li.innerHTML = '<input type="checkbox"' + flag + '/><p >' + text + '</p><a href="javascript:;"></a>'
                todolist.appendChild(li)
            }
        }

        //把数据放在内存里
        Str = JSON.stringify(arr);
        localStorage.setItem('key', Str)
    
    }

    //添加事件
    function add(e) {
        if ((e.code == 13 || e.code == 'Enter') && (title.value != '')) {
            //获取内容+内容存在数组里面
            let _content = title.value
            arr.push({ content: _content, done: false })
            title.value = '';
        }
        load()
    }
    //切换事件
    function change(e) {
        var count = e.target.parentElement.getAttribute('date_index');
        console.log(count);
        if (e.target.checked) {
            //数组内切换
            arr[count].done = true;
        } else if (!e.target.checked) {
            //数组内切换
            arr[count].done = false
        } else { }
        //删除事件
        if (e.target == e.target.parentElement.querySelector('a')) {
            arr.splice(count, 1)
        }
        load()
    }
    //检测页面 +  数组  写入local
    console.log(arr);
    console.log(doList, todolist);

    arr=JSON.parse(localStorage.getItem("key"))
    title.addEventListener('keyup', add)
    doList.addEventListener('click', change)
    todolist.addEventListener('click', change)
    load()

})()
