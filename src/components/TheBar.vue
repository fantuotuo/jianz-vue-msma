<template>
	<div class='kt-bar progress' style='height:35px;'>
		<div 
			class='progress-bar' 
			v-bind:class='{"progress-bar-animated":play,"progress-bar-striped":active}'
			v-on:click='$emit("clc",index)'
		>
			{{sentence}}
		</div>
	</div>
</template>

<script>
export default{
	name:"TheBar",
	props:{
		sentence:String,
		active:Boolean,
		play:Boolean,
		index:Number
	}

}
</script>

<style lang='scss'>
.kt-bar{
	>div{
		width:100%;
		text-align:left;
		padding-left:10px;
		font-size:1rem;
		cursor: pointer;
	}
}
.progress-bar:not(.progress-bar-striped){
	background:transparent;
	color:#333;
	&:hover{
		background:var(--blue);
		color:#fff;
	}
}
@media(screen){
	.kt-bar{
		>div{
			font-size:1.4rem;
		}
	}
}

</style>