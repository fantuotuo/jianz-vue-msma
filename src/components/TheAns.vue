<template>
	<div class='kt-ans'>
		<transition mode='out-in'>
			<div 
				v-if='show'
				class='kt-ans__div clearfix'
				v-on:click='show=!show'
				key='key1'
			>
				<div
					v-for='(obj,i) in ans_list'
					v-bind:key='i'
					class='kt-block'
				>
					<div>
						<span 
							v-for='(obj_num,j) in obj.nums'
							v-bind:key='j'
							v-bind:class='{"kt-block__char--active":obj_num.active}'
						>
							{{obj_num.char}}
						</span>
					</div>
					<span v-bind:class='{"kt-block__char--active":obj.active}'>
						{{obj.char}}
					</span>
				</div>
			</div>
			<div 
				v-else
				class='kt-ans__div kt-ans__div--pre'
				v-on:click='show=!show'
				key='key2'
			>
				点击显示答案
			</div>
		</transition>
	</div>
</template>

<script>
export default{
	name:"TheAns",
	props:{
		ans_list:Array
	},
	data:function(){
		return {
			show:false
		}
	}
}


</script>

<style lang='scss'>
$height1:180px;
$height2:240px;

.kt-ans{
	height:$height1;
	background:#333;
	overflow:hidden;
	color:#c2c2c2;
}
.kt-ans__div{
	height:100%;
	overflow-y: auto;
	padding:10px;
}
.kt-ans__div--pre{
	background:#999;
	text-align:center;
	line-height:$height1 - 20px;
	user-select:none;
	color:#dedede;
	font-size:1.6rem;
}
@media(min-width:576px){
	.kt-ans{
		height:$height2;
	}
	.kt-ans__div{
		padding:30px;
	}
	.kt-ans__div--pre{
		line-height:$height2 - 60px;
	}
}




.v-enter,
.v-leave{
	opacity: 0;
}
.v-enter-active,
.v-leave-active{
	transition:all 0.3s ease;
}


.kt-block{
	height:36px;
	float:left;
	margin-right:13px;
	margin-bottom:20px;
	text-align:center;
	font-size:0.9rem;
}
@media(min-width:576px){
	.kt-block{
		margin-right:30px;
		height:62px;
		font-size:1.6rem;
	}
}
.kt-block__char--active{
	color:#de7536;
}
</style>