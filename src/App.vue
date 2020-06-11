<template>
	<div id="app" class='container'>
		<TheHeader />
		<TheTip />
		<TheBars />
	</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import TheHeader from './components/TheHeader.vue';
import TheTip from './components/TheTip.vue';
import TheBars from './components/TheBars.vue';asd

export default {
	name: 'App',
	components: {
		TheHeader,
		TheTip,
		TheBars
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/*width:;*/
}
.kt-footer{
	margin-top:20px;
	font-size:0.7rem;
}
@media(min-width:576px){
	.kt-footer{
		font-size:0.9rem;
	}
}
</style>
