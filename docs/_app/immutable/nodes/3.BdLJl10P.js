import"../chunks/disclose-version.Bg9kRutz.js";import{ar as h,K as p,al as S,M as r,H as I,i as d,r as j,u as J,I as P,J as W,n as q,j as R,at as A,aB as K,aC as U}from"../chunks/runtime.DD9P7UtZ.js";import{a as c,t as v,d as H,e as Q}from"../chunks/template.DwuC60L5.js";import{p as G}from"../chunks/proxy.l90FIO8H.js";import{a as w,f as X}from"../chunks/store.Cd9nlHzj.js";import{e as M,i as D,a as Z}from"../chunks/attributes.CBqhYefo.js";import{e as tt,C as et,c as nt}from"../chunks/CMS.qCGxrTCb.js";import{c as at,b as ot}from"../chunks/this.BYAN71Dg.js";import{s as st,p as C}from"../chunks/props.BWsmVjQd.js";import{t as it}from"../chunks/class.CrBA6yAf.js";import{s as $}from"../chunks/snippet.DqJGmPja.js";var rt=v('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function lt(a){var t=rt();c(a,t)}var ht=v('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function pt(a){var t=ht();c(a,t)}var dt=v('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function ct(a){const t=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var n=dt(),e=h(p(n),2);M(e,17,()=>t,D,(s,o)=>{let l=()=>d(o).tag,i=()=>d(o).text;var m=H(),u=S(m);tt(u,l,!1,(f,g)=>{var T=Q();I(()=>w(T,i())),c(g,T)}),c(s,m)}),r(n),c(a,n)}var ut=v("<p> </p>");function gt(a,t){var n=ut(),e=p(n);r(n),I(()=>w(e,`I am component A and my favorite number is ${t.number??""}.`)),c(a,n)}var mt=v("<p> </p>");function yt(a,t){var n=mt(),e=p(n);r(n),I(()=>w(e,`I am component B and my name is ${t.name??""}.`)),c(a,n)}var vt=v('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function ft(a){const t={A:gt,B:yt},n=[{component:"A",number:42},{component:"B",name:"Russell"}];var e=vt(),s=h(p(e),2);M(s,17,()=>n,D,(o,l)=>{var i=H();const m=j(()=>t[d(l).component]);var u=S(i);at(u,()=>d(m),(f,g)=>{g(f,st(()=>d(l)))}),c(o,i)}),r(e),c(a,e)}var wt=v("<div><!></div>");function bt(a,t){W(t,!0);let n=C(t,"root",3,null),e=C(t,"top",3,0),s=C(t,"bottom",3,0),o=C(t,"increments",3,100),l=C(t,"value",15,void 0),i=[],m=[],u=[],f=[],g;function T(){let y=0,_=0;for(let x=0;x<i.length;x++)i[x]>y&&(y=i[x],_=x);y>0?l(_):l(void 0)}function z(y,_){const x=O=>{O[0].isIntersecting;const F=O[0].intersectionRatio;i[_]=F,T()},B=e()?e()*-1:0,Y=s()?s()*-1:0,N=`${B}px 0px ${Y}px 0px`,V={root:n(),rootMargin:N,threshold:m};f[_]&&f[_].disconnect();const E=new IntersectionObserver(x,V);E.observe(y),f[_]=E}function k(){u.length&&u.forEach(z)}J(()=>{for(let y=0;y<o()+1;y++)m.push(y/o());u=g.querySelectorAll(":scope > *:not(iframe)"),k()}),J(()=>{e(),s(),k()});var b=wt(),L=p(b);$(L,()=>t.children??q),r(b),ot(b,y=>g=y,()=>g),c(a,b),P()}var _t=v('<div class="step svelte-12sq0x6"><p class="svelte-12sq0x6"> </p></div>'),kt=v('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function xt(a){let t=A(void 0);var n=kt(),e=p(n),s=h(p(e)),o=p(s,!0);r(s),r(e);var l=h(e,4);bt(l,{get value(){return d(t)},set value(i){R(t,G(i))},children:(i,m)=>{var u=H(),f=S(u);M(f,16,()=>[0,1,2,3,4],D,(g,T,z)=>{var k=_t();const b=j(()=>d(t)===z);var L=p(k),y=p(L,!0);r(L),r(k),I(()=>{it(k,"active",d(b)),w(y,T)}),c(g,k)}),c(i,u)},$$slots:{default:!0}}),K(2),r(n),I(()=>w(o,d(t)||"-")),c(a,n)}const It=`{
	"title": "The Real Apologies of Salt Lake City",
	"description": "What we can learn from watching reality stars apologize",
	"taglines": {
		"meredith": [
			"Jealousy is a disease, to which I say get well soon.",
			"I may be known for my ice, but I always bring the heat."
		],
		"mary": [
			"I love God, but I will read you like a scripture.",
			"God is my shepherd, and you all look like sheep."
		],
		"heather": [
			"I was raised a Mormon, but now I’m raising a glass of champagne.",
			"Don’t play me. I’ve got the receipts, proof, and the screenshots."
		],
		"angie": ["I may be Greek, but don’t expect an olive branch from me."],
		"lisa": [
			"You don’t have to like me, I love myself enough for the both of us.",
			"I’m on a mission to serve Lisa, and I love that for myself."
		],
		"jen": [
			"In this town, I’m queen bee and MVP.",
			"The only thing I’m guilty of is being Shah-mazing."
		],
		"bronwyn": [
			"The only muted thing you’d find in my wardrobe is my Black Card."
		],
		"whitney": [
			"This Rose isn’t scared to handle a little prick.",
			"On my healing journey, I always travel first class."
		]
	},
	"sections": [
		{
			"section": "Title screen",
			"slides": [
				{
					"content": [
						{
							"type": "Title",
							"value": {
								"content": [
									{
										"type": "h2",
										"value": "What we can learn from watching reality stars apologize"
									},
									{
										"type": "p",
										"value": "By <a href=http://pudding.cool/author/michelle-pera-mcghee target=_blank>Michelle Pera-McGhee</a>"
									}
								]
							}
						}
					]
				}
			]
		},
		{
			"section": "The “smelled like hospital” incident",
			"slides": [
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "It all started when Mary said that Jen “smelled like hospital.”"
							}
						},
						{ "type": "ClipPreview", "value": { "id": "s1_e1_opening" } }
					]
				},
				{ "content": [{ "type": "Clip", "value": { "id": "s1_e1_opening" } }] },
				{
					"content": [
						{ "type": "h2", "value": "Let’s rewind." },
						{
							"type": "p",
							"value": "Mary Cosby and Jen Shah are cast members on <i>The Real Housewives of Salt Lake City</i>."
						},
						{
							"type": "p",
							"value": "If this show isn’t on your radar, it’s time to fix that. As one of the newest installments of the <i>Real Housewives</i> franchise, it follows the lives of wealthy women living in or near Salt Lake City, Utah, and delivers top-tier drama."
						},
						{
							"type": "img",
							"value": {
								"src": "assets/img/rhoslc.jpeg",
								"alt": "The entire cast standing in a row next to the title of the show"
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "From the first episode, it’s clear Jen and Mary don’t see eye to eye. Why? One unforgettable comment: Mary said that Jen “smelled like hospital.”"
							}
						},
						{
							"type": "ClipPreview",
							"value": { "id": "s1_e1_hospital-explanation" }
						}
					]
				},
				{
					"content": [
						{ "type": "Clip", "value": { "id": "s1_e1_hospital-explanation" } }
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "Fast forward a bit, and the two are at a party together. Jen is still holding onto the comment and wants an apology from Mary.",
								"position": "bottom-left"
							}
						},
						{
							"type": "ClipPreview",
							"value": { "id": "s1_e1_jen-wants-apology" }
						}
					]
				},
				{
					"content": [
						{ "type": "Clip", "value": { "id": "s1_e1_jen-wants-apology" } }
					]
				},
				{
					"content": [
						{ "type": "h2", "value": "What makes for a good apology?" },
						{
							"type": "p",
							"value": "<a href=https://www.youtube.com/watch?v=q-ApAdEOm5s&ab_channel=TED-Ed target=_blank>Research</a> <a href=https://www.npr.org/2023/01/25/1150972343/how-to-say-sorry-give-good-apology target=_blank>on</a> <a href=https://www.oprahdaily.com/life/relationships-love/a42408012/steps-to-apologize/ target=_blank>the</a> subject highlights some recurring themes."
						},
						{
							"type": "Checklist",
							"value": {
								"items": [
									"listen",
									"say you’re sorry",
									"own it",
									"show remorse",
									"commit to do better in the future"
								]
							}
						}
					]
				},
				{
					"content": [
						{ "type": "h2", "value": "Let’s see how Mary handles it." },
						{
							"type": "Clips",
							"value": {
								"clips": [
									{ "id": "s1_e1_odor", "caption": "❌ Explaining it away" },
									{
										"id": "s1_e1_wording",
										"caption": "❌ Disputing exact wording"
									},
									{
										"id": "s1_e1_keri",
										"caption": "❌ Deflecting to the messenger"
									},
									{ "id": "s1_e1_water", "caption": "❌ No remorse here…" }
								]
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": { "text": "It doesn’t end well.<br/>(It rarely does.)" }
						},
						{ "type": "Clip", "value": { "id": "s1_e1_slam" } }
					]
				}
			]
		},
		{
			"section": "The data",
			"slides": [
				{
					"content": [
						{
							"type": "p",
							"value": "In the world of reality television, apologies are a central theme. People are constantly wronging each other, confronting each other, demanding apologies, and—more often than not—sidestepping them. We can tell the apologies don’t work because the same issues resurface in the next episode, again and again."
						},
						{
							"type": "Clip",
							"value": { "id": "s5_e2_issues", "inline": "true" }
						}
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "To understand just how bad these apologies are, I went through every episode of The Real Housewives of Salt Lake City and documented the apology moments."
						},
						{
							"type": "img",
							"value": {
								"src": "assets/img/receipts_proof_timeline_screenshots.gif",
								"alt": "Heather Gay screaming “receipts, proof, timeline, screenshots” in Season 4."
							}
						}
					]
				},
				{
					"content": [
						{
							"content": [
								{
									"type": "p",
									"value": "These are all the moments when an <span class=dark-purple>apology</span> was being attempted or demanded. Almost every episode has at least one."
								},
								{ "type": "EpisodeChart", "value": { "view": "all" } }
							]
						},
						{
							"content": [
								{
									"type": "p",
									"value": "And here’s how often it was actually a <span class=good>decent apology</span> as opposed to one like Mary’s. If the apologizer 1. acknowledged the action, 2. expressed remorse genuinely, and 3. the recipient accepted it, I classified it as good enough."
								},
								{ "type": "EpisodeChart", "value": { "view": "good" } }
							]
						},
						{
							"content": [
								{
									"type": "p",
									"value": "That’s using pretty generous criteria. On the other side, 52% of the apologies are <span class=bad>flagrantly bad.</span>"
								},
								{ "type": "EpisodeChart", "value": { "view": "bad" } }
							]
						}
					],
					"multi": "true"
				},
				{
					"content": [
						{
							"type": "p",
							"value": "And while some cast members do a better job than others…"
						},
						{
							"type": "BarChart",
							"value": {
								"keys": ["num_good_apologies", "num_bad_apologies"],
								"percent": "true"
							}
						},
						{
							"type": "p",
							"value": "It’s clear that bad apologies are as central to the show (if not more) than good ones."
						}
					]
				},
				{
					"content": [
						{
							"type": "h2",
							"value": "Why are the women of RHOSLC so bad at apologizing?"
						},
						{
							"type": "p",
							"value": "To find out, I watched all 91 episodes and dissected some of the messiest moments with a therapist. This show is unwittingly a masterclass in <strong><span class=dark-purple>how <i>not</i> to apologize</span></strong>, which turns out to hold valuable lessons for all of us on how to get it right."
						},
						{ "type": "img", "value": { "src": "assets/img/rhoslc2.png" } }
					]
				}
			]
		},
		{
			"section": "What is an apology?",
			"slides": [
				{
					"content": [
						{
							"type": "h2",
							"value": "This is how many times each cast member has said the word <span class=dark-purple>“sorry”</span> on the show."
						},
						{
							"type": "p",
							"value": "This is excluding times where the word was used outside of the context of an apology. Some people say it freely, others not so much."
						},
						{ "type": "BarChart", "value": { "keys": ["num_real_sorrys"] } }
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "Is saying “sorry” what makes an apology? The presence of the word is a decent proxy for a good apology. If someone doesn’t want to say it, it feels like they’re sidestepping a true apology. There’s a lot present in the two words—taking ownership, showing remorse. It’s simple, but powerful."
						},
						{ "type": "svg", "value": { "src": "vennDiagram" } }
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "Let’s take a look at a moment from Jen, #2 “sorry”-sayer."
						},
						{
							"type": "BarChart",
							"value": { "keys": ["num_real_sorrys"], "highlight": "jen-shah" }
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "Here, Jen is attempting to apologize, but just can’t help adding some more after the “sorry.”",
								"position": "bottom-left"
							}
						},
						{ "type": "ClipPreview", "value": { "id": "s1_e12_i-would-never" } }
					]
				},
				{
					"content": [
						{ "type": "Clip", "value": { "id": "s1_e12_i-would-never" } }
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "That’s psychotherapist and author <a href=https://www.lazaruslynch.com/ target=_blank>Lazarus Lynch</a>. I showed him some scenes from the show to get his take."
							}
						},
						{ "type": "ClipPreview", "value": { "id": "hi_laz" } }
					]
				},
				{
					"content": [{ "type": "Clip", "value": { "id": "s1_e12_hypnotist" } }]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "But we don’t want to give “sorry” too much weight."
						},
						{
							"type": "h2",
							"value": "Sometimes the word becomes a magic wand, a shortcut to accomplishing everything an apology needs without trying."
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "Like here, where Britani decides she wants to “officially” apologize for saying rude things about Bronwyn’s husband. She goes through the motions, but it doesn’t land.",
								"position": "bottom-left"
							}
						},
						{ "type": "ClipPreview", "value": { "id": "s5_e10_britani" } }
					]
				},
				{
					"content": [
						{
							"type": "Clip",
							"value": {
								"id": "s5_e10_britani",
								"caption": "It’s hard to come back from calling someone a gold digger…"
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "Or here, where Lisa repeatedly shouts “I’m sorry for your loss!” at Whitney, which also doesn’t land.",
								"position": "bottom-right"
							}
						},
						{
							"type": "ClipPreview",
							"value": { "id": "s4_e12_sorry-for-your-loss" }
						}
					]
				},
				{
					"content": [
						{
							"type": "Clip",
							"value": {
								"id": "s4_e12_sorry-for-your-loss",
								"caption": "At a party, Whitney shares that she’s grieving her friend’s death, but Lisa doesn’t seem to acknowledge it, leading to Whitney expressing hurt and Lisa reacting defensively."
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "h2",
							"value": "So while a simple <span class=dark-purple>“sorry”</span> can accomplish a lot, it doesn’t always equate to a good apology."
						},
						{
							"type": "p",
							"value": "What “sorry” teaches us, though, is the value of keeping it simple—just standing in it, instead of scrambling to defend or explain."
						}
					]
				}
			]
		},
		{
			"section": "Why are apologies hard?",
			"slides": [
				{
					"content": [
						{
							"type": "p",
							"value": "Why is it so hard for us to just stand in it? Let’s focus on Lisa Barlow, who apologizes a lot, but has one of the lowest rates of effectiveness."
						},
						{
							"type": "BarChart",
							"value": {
								"keys": ["num_good_apologies", "num_bad_apologies"],
								"highlight": "lisa-barlow"
							}
						},
						{
							"type": "TalkingHead",
							"value": {
								"name": "lisa",
								"audio": "s3_e1_problem-saying-sorry",
								"quote": "Do I have a problem saying I’m sorry? Never. Do I have a problem taking accountability for my actions or my words? Not at all."
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "Here, Meredith shares that she didn’t feel like Lisa was there for her when her father died."
							}
						},
						{
							"type": "ClipPreview",
							"value": { "id": "s2_e23_lisa-reunion-apology" }
						}
					]
				},
				{
					"content": [
						{ "type": "Clip", "value": { "id": "s2_e23_lisa-reunion-apology" } }
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "At the very end when Lisa says “I’m a horrible person”, an over-exaggerated “apology”, I think we get a glimpse into what Lisa feels is at stake here. Let’s hear from Lazarus.",
								"position": "bottom-right"
							}
						},
						{ "type": "ClipPreview", "value": { "id": "laz-reacts-to-lisa" } }
					]
				},
				{
					"content": [
						{ "type": "Clip", "value": { "id": "laz-reacts-to-lisa" } }
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "Although I’ve never met anyone quite like Lisa Barlow, I know many people (myself included) who fall into this trap when asked to apologize: mistaking it for an attack on our character, and getting defensive."
						},
						{
							"type": "p",
							"value": "It’s as if the conversation is no longer about the fact that I got the wrong type of salad greens from the grocery store, it’s about something much bigger and more threatening: whether you see me as a good, kind person, and more importantly, whether deep down I do."
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "This moment from psychologist and author on apologies Harriet Lerner’s <a href=https://www.youtube.com/watch?v=5r6Y9uhmL6Y&ab_channel=TEDxTalks target=_blank>Ted Talk</a> encapsulates it well:",
								"position": "bottom-left"
							}
						},
						{ "type": "Clip", "value": { "id": "harriet" } }
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "It’s no wonder Lisa Barlow can never apologize even when she’s being begged to. It’s too threatening. And that tightrope of defensiveness is getting pretty worn out, if you ask me."
						},
						{
							"type": "img",
							"value": {
								"class": "reddit",
								"src": "assets/img/lisa_reddit_1.png",
								"alt": "Reddit post that reads: “Looking for an apology for Lisa is a pointless exercise I genuinely cannot recall an on-camera, sincere apology from her any season - doesn’t mean they don’t exist I just find it hard to believe lol”"
							}
						},
						{
							"type": "img",
							"value": {
								"class": "reddit",
								"src": "assets/img/lisa_reddit_2.png",
								"alt": "Reddit post that reads: “I love Lisa, but totally get the posts of frustration after the reunion. Like even if it’s for self preservation and making the audience believe she has some empathy… Girl just say sorry”"
							}
						},
						{
							"type": "img",
							"value": {
								"class": "reddit",
								"src": "assets/img/lisa_reddit_3.png",
								"alt": "Reddit post that reads: “Lisa can’t see other people’s perspective because she’s self absorbed and lacks self awareness”"
							}
						},
						{
							"type": "p",
							"value": "<a href=https://www.reddit.com/r/rhoslc/comments/1i8jr01/lisas_lack_of_remorse/?rdt=55618 target=_blank>Via Reddit (“Lisa’s Lack of Remorse”)</a>"
						}
					]
				}
			]
		},
		{
			"section": "How do you know it’s real?",
			"slides": [
				{
					"content": [
						{
							"type": "p",
							"value": "When I first started going through these apology moments, I figured a key piece of what would make for a good apology was that it <span class=dark-purple>seemed genuine</span>."
						},
						{
							"type": "p",
							"value": "But Lazarus said he actually doesn’t consider genuineness to be an important part of a good apology—just because someone seems sorry doesn’t necessarily mean they really are or that real healing will happen."
						}
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "That might help explain this: here are Jen Shah’s apologies. Fans of the show might be surprised that she has the highest total number of solid apologies and a decent effectiveness rate."
						},
						{
							"type": "BarChart",
							"value": {
								"keys": ["num_good_apologies", "num_bad_apologies"],
								"highlight": "jen-shah"
							}
						},
						{
							"type": "TalkingHead",
							"value": {
								"name": "jen",
								"audio": "s2_e2_book-on-apologizing",
								"quote": "You know what? I need to write a goddamn book on how to apologize. Apologizing for the same goddamn thing in 101 different ways."
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "Jen actually does apologize a lot. And she does a good job. She owns it, she shows remorse, vows to do better. Like here, where she apologizes to Meredith and Seth about saying mean things about their marriage.",
								"position": "bottom-left"
							}
						},
						{ "type": "ClipPreview", "value": { "id": "s1_e16_jen-reunion" } }
					]
				},
				{
					"content": [
						{ "type": "Clip", "value": { "id": "s1_e16_jen-reunion" } }
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "Or here, where she apologizes for her behavior while also sharing context on her childhood that helps explain (but not excuse) her actions.",
								"position": "bottom-right"
							}
						},
						{ "type": "ClipPreview", "value": { "id": "s1_e4_luncheon" } }
					]
				},
				{
					"content": [{ "type": "Clip", "value": { "id": "s1_e4_luncheon" } }]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "So, is Jen the queen of apologies and healthy, harmonious relationships?"
						},
						{
							"type": "TalkingHead",
							"value": {
								"name": "jen",
								"audio": "s2_e2_book-on-apologizing",
								"quote": "You know what? I need to write a goddamn book on how to apologize. Apologizing for the same goddamn thing in 101 different ways.",
								"queen": "true"
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "Not so much. The problem with many of Jen’s apologies is that after these moments, she turns around and finds herself in the same situations again. There are clearly no lasting changes to her behavior."
						},
						{
							"type": "p",
							"value": "Perhaps these believable yet flimsy apologies shouldn’t come as a surprise from someone who is currently <a href=https://www.realitytea.com/2024/10/17/jen-shah-prison-sentence-reduced-details/  target=_blank>in prison for fraud</a> and had the audacity to make her tagline <i>“the only thing I’m guilty of is being Shah-mazing”</i> while the show covered her impending trial."
						},
						{
							"type": "ImageGrid",
							"value": {
								"images": [
									{
										"src": "assets/img/jen-throws-drink.gif",
										"caption": "Jen throws her drink at a party."
									},
									{
										"src": "assets/img/jen-pours-drink.jpg",
										"caption": "Jen pours champagne on Angie’s head (it’s “just a joke”!)"
									},
									{
										"src": "assets/img/jen-drown.gif",
										"caption": "While in a hot tub with Whitney, Jen informs her that she will drown her."
									},
									{
										"src": "assets/img/jen-throws-shoe.png",
										"caption": "As retaliation for Angie being upset at the champagne pouring, Jen throws her shoes off the boat when she’s not looking."
									}
								]
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "Text",
							"value": {
								"text": "So, are these effective apologies?<br/>There’s more to an apology than what is said in the moment. There’s also what happens after the apology."
							}
						},
						{ "type": "ClipPreview", "value": { "id": "laz-two-pieces" } }
					]
				},
				{
					"content": [{ "type": "Clip", "value": { "id": "laz-two-pieces" } }]
				},
				{
					"content": [
						{
							"type": "h2",
							"value": "If the goal of an apology is to create healing, change on the other side needs to be demonstrated for it to hold up."
						},
						{
							"type": "p",
							"value": "This also explains why so many issues on the show recur again and again, ready to be brought up at any minute. The final step of actually facing the thing you apologized for, bettering yourself, and being different rarely occurs."
						},
						{
							"type": "Clip",
							"value": { "id": "s5_e9_still-a-problem", "inline": "true" }
						}
					]
				}
			]
		},
		{
			"section": "Conclusion",
			"slides": [
				{
					"content": [
						{
							"type": "p",
							"value": "It can be infuriating to watch these ineffective apologies and constant conflict. As audience members, we feel like we can see where they went wrong, why the apologies aren’t working, thinking we would do better if we were in their shoes."
						},
						{ "type": "h2", "value": "But would we?" }
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "In regular life, we often withhold our grievances, and we are not nearly this confrontational."
						},
						{
							"type": "p",
							"value": "When’s the last time you demanded an apology from someone?"
						}
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "This show shows us what happens when you’re not allowed to stop hanging out with people you sort of hate, so you are forced to manage conflict!"
						},
						{
							"type": "p",
							"value": "These women are encouraged to share their feelings, air their grievances, and confront people, which all make for great TV. And frequent, if messy, apology attempts."
						}
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "It’s easy to watch and think “I’m nothing like these women.” It’s harder to take a look at the ways in which these women are addressing conflict more than we ever would, and even though they often do a bad job, it’s in a lot of the same ways that you or I would."
						}
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "We started off with a notion of <span class=good>good</span> and <span class=bad>bad</span> apologies, but at this point, we’ve seen how some of those “good” ones are actually sort of bad, and how the “bad” ones are more understandable than you might think."
						},
						{
							"type": "h2",
							"value": "There’s not a formula for a guaranteed good apology."
						},
						{
							"type": "p",
							"value": "Part of a good apology is that it lands with the person you’re apologizing to, and each person is different. That’s what this <a href=https://5lovelanguages.com/quizzes/apology-language target=_blank>“apology language”</a> concept (from the same people who brought you “love languages”) tries to get at—everyone needs something slightly different."
						},
						{
							"type": "img",
							"value": {
								"src": "assets/img/apology_language.png",
								"alt": "A screenshot of Michelle’s apology language quiz results"
							}
						}
					]
				},
				{
					"content": [
						{
							"type": "p",
							"value": "Apologies are a core part of human relationships. We’re all so different and so flawed, and we’re bound to mistreat one another, at least occasionally."
						},
						{
							"type": "p",
							"value": "Lazarus ended our conversation by saying,"
						},
						{
							"type": "h2",
							"value": "<span class=dark-purple>“If you’re in healthy relationships with people, you’ll have to apologize and they’ll have to apologize to you.”</span>"
						}
					]
				},
				{
					"content": [
						{
							"type": "h2",
							"value": "Seeking or attempting an apology isn’t something to be ashamed of. It’s a sign you care about a relationship and want to work towards <a href=https://www.gawkerarchives.com/culture/a-utah-linguist-talks-to-gawker-about-whitney-roses-hilling-journey target=_blank>hilling</a>—I mean, healing."
						},
						{ "type": "img", "value": { "src": "assets/img/i-love-that.gif" } }
					]
				}
			]
		}
	]
}
`;var Tt=v('<p> </p> <progress max="100"></progress>',1);function Ct(a,t){let n=C(t,"label",3,"A"),e=C(t,"value",3,0);var s=Tt(),o=S(s),l=p(o,!0);r(o);var i=h(o,2);I(()=>{w(l,n()),Z(i,e())}),c(a,s)}var zt=v('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function Lt(a,t){W(t,!0);const{body:n}=nt,e={Test:Ct};var s=zt(),o=h(p(s),2),l=p(o),i=p(l,!0);I(()=>w(i,It.replace(/\t/g," "))),r(l),r(o);var m=h(o,2);et(m,{components:e,body:n}),r(s),c(a,s),P()}const St=(a,t=q)=>{var n=jt(),e=p(n),s=p(e,!0);r(e);var o=h(e,2),l=p(o,!0);r(o),r(n),I(()=>{w(s,t().name),w(l,t().age)}),c(a,n)};var jt=v('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),At=(a,t)=>U(t),Mt=(a,t)=>t.random(Math.floor(Math.random()*10)),Dt=v('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Bt(a,t){W(t,!0),C(t,"age",3,30);const n=[{name:"John",age:30},{name:"Jill",age:45}];let e=A(0),s=j(()=>d(e)*2),o=j(()=>d(e)*2),l=A(0);J(()=>{R(l,d(e)*2)});var i=Dt(),m=h(S(i),4);m.__click=[At,e];var u=h(m,2),f=p(u);r(u);var g=h(u,2),T=p(g);r(g);var z=h(g,2),k=p(z);r(z);var b=h(z,4),L=p(b);$(L,()=>t.children??q),r(b);var y=h(b,4);y.__click=[Mt,t];var _=h(y,4);M(_,21,()=>n,D,(x,B)=>{St(x,()=>d(B))}),r(_),I(()=>{w(f,`${d(e)??""} doubled is ${d(s)??""} (derived)`),w(T,`${d(e)??""} doubled is ${d(o)??""} (derived by)`),w(k,`${d(e)??""} doubled is ${d(l)??""} ($effect)`)}),c(a,i),P()}X(["click"]);var Jt=v('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!></div>');function Pt(a){let t=A(0);function n(g){console.log(g)}var e=Jt(),s=h(p(e),2);Bt(s,{get value(){return d(t)},set value(g){R(t,G(g))},random:n});var o=h(s,2);lt(o);var l=h(o,2);pt(l);var i=h(l,2);ct(i);var m=h(i,2);ft(m);var u=h(m,2);Lt(u,{});var f=h(u,2);xt(f),r(e),c(a,e)}function Ft(a){Pt(a)}export{Ft as component};
