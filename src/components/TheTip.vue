<template>
	<div class='kt-tip'>
		操作说明<br />
		1.“嘀”代表数字“1”，“嘀嘀”两下代表数字“2”，“嘀嘀嘀”三下代表数字“3”<br />
		2.写下摩斯电报的密码，然后再解密。每个数字代码由1-3个数字串组成，数字串之间会有1.5秒间隔
	</div>
</template>

<script>
export default{
	name:"TheTip"



}
</script>

<style lang='scss'>
.kt-tip{
	padding:10px 0 10px;
	font-size:0.9rem;
}
@media(min-width:576px){
	.kt-tip{
		font-size:1rem;
	}
}
</style>