<template>
	<div class='kt-header'>
		<div class='kt-header__title'>
			C29-摩斯密码
		</div>
		<div class='kt-header__logo'>
			<img src='../assets/logo.png' />
		</div>
		<div class='kt-header__hr clearfix'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>

</template>

<script>
export default{
	name:"TheHeader",

}
</script>

<style lang='scss'>
.kt-header{
	position:relative;
	margin-bottom:5px;
}
.kt-header__title{
	font-weight: 600;
    font-size: 1.4rem;
    text-align: center;
    height:70px;
    padding-top:20px;
}
.kt-header__logo{
	position:absolute;
	top:5px;
	left:5px;
}
.kt-header__hr{
	height:6px;
	>div{
		width:25%;
		height:100%;
		float:left;
		&:nth-child(1){
			background:red;
		}
		&:nth-child(2){
			background:#4f81bd;
		}
		&:nth-child(3){
			background:#00b050;
		}
		&:nth-child(4){
			background:#ffc000;
		}
	}
}
@media(min-width:576px){
	.kt-header{
		margin-bottom:20px;
	}
	.kt-header__title{
		font-size: 2rem;
	}
	.kt-header__hr{
		height:9px;
	}
}
</style>