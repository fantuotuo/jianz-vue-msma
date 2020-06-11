<template>
	<div>
		<TheAns v-bind:ans_list='ans_list' />
		<div class='kt-bars' v-on:touchend.once='adapterIOS'>
			<div class='kt-audio'>
				<!-- 手机上两个播放太过接近会导致播放不清的问题，所以使用3个标签 -->
				<!-- 手机上两个播放太近仍然会出现问题，切换使用egret，此项目作废 -->
				<audio ref='audio1' src='../assets/di2.mp3' ></audio>
				<audio ref='audio2' src='../assets/di2.mp3' ></audio>
				<audio ref='audio3' src='../assets/di2.mp3' ></audio>
			</div>
			<TheBar 
				v-for='(item,i) in sentences'
				v-bind:key='i'
				v-bind:sentence='item.sentence'
				v-bind:active='i===current'
				v-bind:play='(i===current)&&play'
				v-bind:index='i'
				v-on:clc='changeCurrent'
			/>
		</div>
	</div>
	
</template>

<script>
const PRP_NUM = [
	{},
	{ times: 1, inter: 500 },
	{ times: 2, inter: 250 },
	{ times: 3, inter: 165 },
];
const LEN_NUM = [0,500,500,500];		// 一个电报码的持续时长
const INTER_NUM = 750;			// 每个 电报码 之间的间隔
const INTER_CHAR = 2500;		// 每个 字符 之间的间隔（包含1~3个电报码）
const INTER_BEGIN = 1000;		// 开始延迟时间

import TheAns from './TheAns.vue';
import TheBar from './TheBar.vue';

export default{
	name:"TheBars",
	methods:{
		changeCurrent(index){
			if(index===this.current){
				if(this.play){
					this.play=false;
					this.stopSentence();
				}else{
					this.play=true;
					this.currentChar=-1;
					this.ans_list=this.initAnsChars(this.sentences[index].code);

					this.saySentence(this.sentences[index].code,{
						doms:this.ans_list,
						update:this.updateAnsList.bind(this)
					},()=>{
						this.stopSentence();
					});
				}
			}else{
				this.play=true;
				this.current=index;
				this.currentChar=-1;
				this.ans_list=this.initAnsChars(this.sentences[index].code);

				this.saySentence(this.sentences[index].code,{
					doms:this.ans_list,
					update:this.updateAnsList.bind(this)
				},()=>{
					this.stopSentence();
				});
			}
		},
		stopSentence(){
			this.clearHandler();
			this.$refs["audio1"].pause();
			this.$refs["audio2"].pause();
			this.$refs["audio3"].pause();
			this.play=false;
		},
		sayDi(c){
			let audio=this.$refs["audio"+c];
			if(!audio) return;
			audio.pause();
			audio.currentTime = 0;
			audio.play();
		},
		sayNum(n){
			let n_int=parseInt(n);

			let prp = PRP_NUM[n_int];
        
			let c = 0;
			loop.bind(this)();
			function loop() { 
				this.timeoutHandler && clearTimeout(this.timeoutHandler);
				this.timeoutHandler=null;
				c++;
				if (c > prp.times) {
					loopEnd.bind(this)();
					return;
				}
				this.sayDi(c);
				this.timeoutHandler=setTimeout(loop.bind(this),prp.inter);
			}
			function loopEnd() {

			}
		},
		sayChar(nnn,before_sayNum,callback){
			let arr = (nnn + "").split("");
		
			let c = -1;
			loop.bind(this)();
			function loop() { 
				this.timeoutHandlerChar && clearTimeout(this.timeoutHandlerChar);
				this.timeoutHandlerChar=null;
				c++;
				if (c >= arr.length) {
					let t = INTER_CHAR - INTER_NUM;
					this.timeoutHandlerChar=setTimeout(loopEnd.bind(this),t);
					return;
				}

				before_sayNum();
				this.sayNum(arr[c]);
				let t = LEN_NUM[parseInt(arr[c])] + INTER_NUM;
				this.timeoutHandlerChar=setTimeout(loop.bind(this),t);
			}
			function loopEnd() { 
				callback();
			}
		},
		saySentence(nnn_arr,ans_chars,callback){
			let c = -1;
			// let c_ans_chars = -1;
			this.timeoutHandlerChar && clearTimeout(this.timeoutHandlerChar);
			this.timeoutHandlerChar=null;
			this.timeoutHandlerChar=setTimeout(loop.bind(this),INTER_BEGIN);

			function loop() { 
				c++;
				if (c >= nnn_arr.length) {
					loopEnd.bind(this)();
					return;
				}
				this.sayChar(nnn_arr[c], () => {
					// 说一个数字前
					ans_chars.update();
				}, loop.bind(this));
			}
			function loopEnd() { 
				// this.stopSentence();
				callback();
			}
		},
		clearHandler(){
			this.timeoutHandler && clearTimeout(this.timeoutHandler);
			this.timeoutHandler=null;
			this.timeoutHandlerChar && clearTimeout(this.timeoutHandlerChar);
			this.timeoutHandlerChar=null;
		},
		updateAnsList(){
			this.currentChar++;

			let ans_list=this.ans_list;
			let c=-1;
			for (var i = 0, len = ans_list.length; i < len; i++) {
				if (!ans_list[i]) continue;
				var dom=ans_list[i];

				dom.active=c<this.currentChar;
				for (var j = 0; j < dom.nums.length; j++) {
					c++;
					dom.nums[j].active = c<=this.currentChar;
				}
			}
		},
		initAnsChars(arr_code) {
			let doms = [];
			var table = {
				"1": "A", "2": "B", "3": "C",
				"11": "D", "21": "E", "31": "F",
				"12": "G", "22": "H", "32": "I",
				"13": "J", "23": "K", "33": "L",
				"111": "M", "211": "N", "311": "O",
				"112": "'", "212": ",", "312": ".",
				"113": "P", "213": "Q", "313": "R",
				"121": "?", "221": "!", "321": "-",
				"122": "S", "222": "T", "322": "U",
				"123": "-", "223": "-", "323": "-",
				"131": "V", "231": "W", "331": "X",
				"132": "-", "232": "-", "332": "-",
				"133": "Y", "233": "Z", "333": " ",
			};
			for (var i = 0, len = arr_code.length; i < len; i++) {
				var char = table[arr_code[i]+""];
				char = char ? char : " ";
				var dom = { char: char, nums: [], active: false };

				var arr = (arr_code[i] + "").split("");
				for (var j = 0; j < arr.length; j++) {
					dom.nums.push({ char: arr[j] + "", active: false });
				}
				doms.push(dom);
			}
			return doms;
		},
		adapterIOS(){
			if(!this.$refs["audio1"]) return;
			this.$refs["audio1"].play();
			this.$refs["audio1"].pause();
			console.log("adapterIOS--complete")
		}
	},
	data:function(){
		return {
			ans_list:[
			],
			currentChar:-1,
			timeoutHandler:null,
			timeoutHandlerChar:null,
			play:true,
			current:-1,
			sentences:[
				{ sentence: "nice to meet you!", code: [211, 32, 3, 21, 333, 222, 311, 333, 111, 21, 21, 222, 333, 133, 311, 322, 221] },
				{ sentence: "I'm a student.", code: [32, 112, 111, 333, 1, 333, 122, 222, 322, 11, 21, 211, 222, 312] },
				{ sentence: "Good afternoon!", code: [12, 311, 311, 11, 333, 1, 31, 222, 21, 313, 211, 311, 311, 211, 221] },
				{ sentence: "happy birthday!", code: [22, 1, 113, 113, 133, 333, 2, 32, 313, 222, 22, 11, 1, 133, 221] },
				{ sentence: "how do you do?", code: [22, 311, 231, 333, 11, 311, 333, 133, 311, 322, 333, 11, 311, 121] },
				{ sentence: "They're lovely.", code: [222, 22, 21, 133, 112, 313, 21, 333, 33, 311, 131, 21, 33, 133, 312] },
				{ sentence: "Good night!", code: [12, 311, 311, 11, 333, 211, 32, 12, 22, 222, 221] },
				{ sentence: "I have a kite.", code: [32, 333, 22, 1, 131, 21, 333, 1, 333, 23, 32, 222, 21, 312] },

				{ sentence: "Do you like blue?", code: [11, 311, 333, 133, 311, 322, 333, 33, 32, 23, 21, 333, 2, 33, 322, 21, 121] },
				{ sentence: "His name is Jack.", code: [22, 32, 122, 333, 211, 1, 111, 21, 333, 32, 122, 333, 13, 1, 3, 23, 312] },
				{ sentence: "It's on the table.", code: [32, 222, 112, 122, 333, 311, 211, 333, 222, 22, 21, 333, 222, 1, 2, 33, 21, 312] },
				{ sentence: "Let's play a game.", code: [33, 21, 222, 112, 122, 333, 113, 33, 1, 133, 333, 1, 333, 12, 1, 111, 21, 312] },
				{ sentence: "He's a funny man.", code: [22, 21, 112, 122, 333, 1, 333, 31, 322, 211, 211, 133, 333, 111, 1, 211, 312] },
				{ sentence: "Good evening!", code: [12, 311, 311, 11, 333, 21, 131, 21, 211, 32, 211, 12, 221] },
				{ sentence: "No,it isn't", code: [211, 311, 212, 32, 222, 333, 32, 122, 211, 112, 222] },
				{ sentence: "How old are you?", code: [22, 311, 231, 333, 311, 33, 11, 333, 1, 313, 21, 333, 133, 311, 322, 121] },

				{ sentence: "What's your name?", code: [231, 22, 1, 222, 112, 122, 333, 133, 311, 322, 313, 333, 211, 1, 111, 21, 121] },
				{ sentence: "Put your hands up!", code: [113, 322, 222, 333, 133, 311, 322, 313, 333, 22, 1, 211, 11, 122, 333, 322, 113, 221] },
				{ sentence: "Who's that lady?", code: [231, 22, 311, 112, 122, 333, 222, 22, 1, 222, 333, 33, 1, 11, 133, 121] },
				{ sentence: "I have a apple.", code: [32, 333, 22, 1, 131, 21, 333, 1, 333, 1, 113, 113, 33, 21, 312] },
				{ sentence: "Goodbye!", code: [12, 311, 311, 11, 2, 133, 21, 221] },
				{ sentence: "Let's colour it.", code: [33, 21, 222, 112, 122, 333, 3, 311, 33, 311, 322, 313, 333, 32, 222, 312] },
				{ sentence: "Put it on the bed.", code: [113, 322, 222, 333, 32, 222, 333, 311, 211, 333, 222, 22, 21, 333, 2, 21, 11, 312] },
				{ sentence: "Where is my car?", code: [231, 22, 21, 313, 21, 333, 32, 122, 333, 111, 133, 333, 3, 1, 313, 121] },

				{ sentence: "Good morning!", code: [12, 311, 311, 11, 333, 111, 311, 313, 211, 32, 211, 12, 221] },
				{ sentence: "Is that Ms White?", code: [32, 122, 333, 222, 22, 1, 222, 333, 111, 122, 333, 231, 22, 32, 222, 21, 121] },
				{ sentence: "I'd like a banana.", code: [32, 112, 11, 333, 33, 32, 23, 21, 333, 1, 333, 2, 1, 211, 1, 211, 1, 312] },
				{ sentence: "Apple are sweet.", code: [1, 113, 113, 33, 21, 333, 1, 313, 21, 333, 122, 231, 21, 21, 222, 312] },
				{ sentence: "It has two big ears and a long nose.", code: [32, 222, 333, 22, 1, 122, 333, 222, 231, 311, 333, 2, 32, 12, 333, 21, 1, 313, 122, 333, 1, 211, 11, 333, 1, 333, 33, 311, 211, 12, 333, 211, 311, 122, 21, 312] },
				{ sentence: "How many people are there in your family,Jamin?", code: [22, 311, 231, 333, 111, 1, 211, 133, 333, 113, 21, 311, 113, 33, 21, 333, 1, 313, 21, 333, 222, 22, 21, 313, 21, 333, 32, 211, 333, 133, 311, 322, 313, 333, 31, 1, 111, 32, 33, 133, 212, 13, 1, 111, 32, 211, 121] }
			]
		}
	},
	components:{
		TheBar,
		TheAns
	}
}

</script>

<style lang='scss'>
.kt-bars{
	height:200px;
	overflow-y:scroll;
}
.kt-audio{
	// display: none;
}
@media(min-width:576px){
	.kt-bars{
		height:300px;
	}
}
</style>