$(function () { 
    //从layui中获取form对象
    var form = layui.form
     var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能出现空格'],

        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }

        }
        
    })

       //监听表单的提交事件
    $(".layui-form").on("submit", function (e) { 
        e.preventDefault();
        console.log($(this).serialize())
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg('更新密码失败')
                }
               
                layer.msg('更新密码成功')
                //重置表单
                $(".layui-form")[0].reset()
            }
        })
    })
 
 
    
}) 

