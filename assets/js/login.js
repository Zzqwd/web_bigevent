$(function () { 

    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })



    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
        
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) { 
        e.preventDefault();

        // var data = $(this).serialize();
        // console.log(data);
        var data = {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name = password]').val(),
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功请登录')
            //模拟点击行为
            $('#link_login').click()
        })
    })
    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) { 
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的元素
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg('登陆失败')
                    
                }
                layer.msg('登陆成功')
                //将登陆成功的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                
             
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})