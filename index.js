import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, getCurrentScope as c, nextTick as l, normalizeClass as u, normalizeStyle as d, onMounted as f, onScopeDispose as p, openBlock as m, ref as h, renderList as g, resolveComponent as _, toDisplayString as v, unref as y, unref as b, watch as x, withCtx as S } from "vue";
//#region node_modules/kirbyuse/dist/composables-Y8gb-rex.mjs
function C() {
	return window.panel;
}
//#endregion
//#region src/composables/useCachedCharacters.js
var w;
async function T() {
	if (w) return w;
	try {
		w = await window.panel.api.get("typo-and-paste/characters");
	} catch (e) {
		console.error("Error loading characters:", e), w = [];
	}
	return w;
}
//#endregion
//#region src/utils/helpers.js
function E(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
//#endregion
//#region \0plugin-vue:export-helper
var D = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, O = { key: 0 }, k = /* @__PURE__ */ D({
	__name: "CharacterSelector",
	props: {
		characters: {
			type: Array,
			required: !0
		},
		languageCode: {
			type: String,
			required: !0
		},
		type: {
			type: String,
			default: "dropdown"
		}
	},
	emits: ["close"],
	setup(c, { emit: p }) {
		let b = c, x = p, w = C(), T = h(), D = h(), k = h(!1), A = b.type === "dialog" ? 12 : 8, j = t(() => b.characters.map((e) => {
			let t;
			t = E(e.label) ? e.label[w.user?.language || "en"] : e.label;
			let n = e.characters.map((e) => {
				let t = e, n = t;
				return E(e) && (e.value && (t = e.value), e.label && (n = E(e.label) ? e.label[w.user?.language || "en"] || t : e.label)), {
					label: n,
					value: t
				};
			});
			return {
				...e,
				characters: n,
				label: t
			};
		}));
		f(async () => {
			await l(), D.value?.[0]?.$el?.focus(), k.value = window.panel.plugins.components["k-typo-search-and-paste-dialog"] !== void 0;
		});
		function M(e) {
			navigator.clipboard.writeText(e), b.type === "dialog" ? w.dialog.close() : x("close"), w.notification.info({
				message: w.t("philippoehrlein.typo-and-paste.copiedMessage", { character: e }),
				icon: void 0
			});
		}
		function N(e) {
			e.key !== "Enter" && e.stopPropagation();
			let t = T.value, n = document.activeElement.closest(".tap-characters__section, .search-section");
			if (!n) return;
			let r = [...n.querySelectorAll(".tap-characters__item")], i = r.indexOf(document.activeElement), a = t.indexOf(n);
			if (i === -1 && a === -1) return;
			let o, s;
			switch (e.key) {
				case "ArrowRight":
					e.preventDefault(), o = i + 1, o < r.length && r[o].focus();
					break;
				case "ArrowLeft":
					e.preventDefault(), o = i - 1, o >= 0 && r[o].focus();
					break;
				case "ArrowDown":
					e.preventDefault(), o = i + A, o >= r.length ? (s = a + 1, s < t.length && P(t[s])) : r[o].focus();
					break;
				case "ArrowUp":
					e.preventDefault(), o = i - A, o < 0 ? (s = a - 1, s >= 0 && F(t[s])) : r[o].focus();
					break;
				case "Enter":
				case "Space":
					e.preventDefault(), i !== -1 && (n.classList.contains("search-section") ? I() : M(r[i].textContent.trim()));
					break;
				case "Tab":
					e.preventDefault(), e.shiftKey ? (s = a - 1, s < 0 ? k.value ? document.querySelector(".search-section .tap-characters__item")?.focus() : F(t.at(-1)) : F(t[s])) : (s = a + 1, s >= t.length ? k.value ? document.querySelector(".search-section .tap-characters__item")?.focus() : P(t[0]) : P(t[s]));
					break;
				case "Escape":
					x("close");
					break;
			}
		}
		function P(e) {
			e.querySelector(".tap-characters__item")?.focus();
		}
		function F(e) {
			[...e.querySelectorAll(".tap-characters__item")].at(-1)?.focus();
		}
		function I() {
			window.panel.dialog.open({ component: "k-typo-search-and-paste-dialog" });
		}
		return (t, l) => {
			let f = _("k-button");
			return c.characters.length ? (m(), i("div", {
				key: 0,
				class: u(["tap-characters", [c.type !== "dialog" && "tap-characters--dropdown"]]),
				tabindex: "-1"
			}, [(m(!0), i(e, null, g(j.value, (t, s) => (m(), i(e, null, [!t.lang || t.lang === c.languageCode ? (m(), i("section", {
				key: s,
				ref_for: !0,
				ref_key: "charactersSections",
				ref: T,
				class: "tap-characters__section"
			}, [t.label ? (m(), i("h3", O, v(t.label), 1)) : r("v-if", !0), a("div", {
				class: "tap-characters__items",
				style: d({ "--grid-columns": y(A) }),
				onKeydown: N
			}, [(m(!0), i(e, null, g(t.characters, (e) => (m(), n(f, {
				key: e.value,
				ref_for: !0,
				ref_key: "characterButtons",
				ref: D,
				class: "tap-characters__item",
				tabindex: "0",
				role: "menuitem",
				title: e.label,
				onClick: (t) => M(e.value)
			}, {
				default: S(() => [o(v(e.value), 1)]),
				_: 2
			}, 1032, ["title", "onClick"]))), 128))], 36)])) : r("v-if", !0)], 64))), 256)), k.value ? (m(), i("section", {
				key: j.value.length,
				class: "search-section"
			}, [s(f, {
				icon: "search",
				class: "tap-characters__item",
				size: "sm",
				onClick: I
			}, {
				default: S(() => [...l[0] ||= [o(" Search ", -1)]]),
				_: 1
			})])) : r("v-if", !0)], 2)) : r("v-if", !0);
		};
	}
}, [["__scopeId", "data-v-eb688596"]]), A = {
	__name: "DropdownButton",
	setup(e) {
		let n = C(), r = h(), a = h([]), o = h(!1), c = t(() => n.language?.code || n.user?.language || "en");
		(async () => {
			a.value = await T();
		})();
		function l() {
			r.value.toggle(), o.value = !o.value;
		}
		return (e, t) => {
			let u = _("k-button"), d = _("k-dropdown-content");
			return m(), i("div", null, [s(u, {
				dropdown: !0,
				title: y(n).t("philippoehrlein.typo-and-paste.buttonTitle"),
				variant: "filled",
				size: "sm",
				icon: "typo-and-paste",
				"aria-haspopup": "menu",
				"aria-expanded": o.value,
				onClick: t[0] ||= (e) => l()
			}, null, 8, ["title", "aria-expanded"]), s(d, {
				ref_key: "dropdownContent",
				ref: r,
				"align-x": "end",
				role: "menu"
			}, {
				default: S(() => [s(k, {
					characters: a.value,
					"language-code": c.value,
					onClose: t[1] ||= (e) => l()
				}, null, 8, ["characters", "language-code"])]),
				_: 1
			}, 512)]);
		};
	}
}, j = {
	id: "typo-and-paste-dialog-title",
	class: "sr-only"
}, M = { class: "sr-only" }, N = {
	__name: "TypoAndPasteDialog",
	emits: [
		"cancel",
		"close",
		"input",
		"submit",
		"success"
	],
	setup(e, { emit: r }) {
		let i = r, o = C(), c = h([]), l = t(() => o.language?.code || o.user?.language || "en");
		return (async () => {
			c.value = await T();
		})(), (e, t) => {
			let r = _("k-dialog");
			return m(), n(r, {
				"cancel-button": !1,
				"submit-button": !1,
				visible: !0,
				size: "medium",
				class: "k-typo-and-paste-dialog",
				role: "dialog",
				"aria-labelledby": "typo-and-paste-dialog-title",
				onCancel: t[0] ||= (e) => i("cancel")
			}, {
				default: S(() => [
					a("h2", j, v(y(o).t("philippoehrlein.typo-and-paste.dialogTitle", "Special Characters")), 1),
					a("p", M, v(y(o).t("philippoehrlein.typo-and-paste.dialogDescription", "Up and down to navigate between sections, left and right to navigate between characters.")), 1),
					s(k, {
						characters: c.value,
						"language-code": l.value,
						type: "dialog"
					}, null, 8, ["characters", "language-code"])
				]),
				_: 1
			});
		};
	}
};
//#endregion
//#region src/composables/useEventListener.js
function P(e, t, n, r) {
	let i, a = () => {
		i?.(), i = void 0;
	}, o = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), s = x(() => F(e), (e) => {
		a(), e && (i = o(e, t, n, r));
	}, {
		immediate: !0,
		flush: "post"
	}), l = () => {
		s(), a();
	};
	return c() && p(l), l;
}
function F(e) {
	let t = b(e);
	return t?.$el ?? t;
}
//#endregion
//#region src/index.js
window.panel.plugin("philippoehrlein/typo-and-paste", {
	icons: { "typo-and-paste": "<path d=\"M10.931 22C9.57512 22 8.37089 21.7948 7.31831 21.3845C6.28357 20.9563 5.47183 20.3498 4.8831 19.5648C4.29437 18.7798 4 17.8432 4 16.7549C4 15.5239 4.31221 14.5427 4.93662 13.8113C5.56103 13.062 6.33709 12.5446 7.26479 12.2592V12.1521C6.46197 11.7596 5.78404 11.2512 5.23099 10.6268C4.69577 9.98451 4.42817 9.11925 4.42817 8.03098C4.42817 6.94272 4.70469 6.02394 5.25775 5.27465C5.82864 4.52535 6.62254 3.96338 7.63944 3.58873C8.65634 3.19624 9.84272 3 11.1986 3C12.5188 3 13.6784 3.20516 14.6775 3.61549C15.6944 4.02582 16.4883 4.61455 17.0592 5.38169C17.63 6.13099 17.9155 7.01408 17.9155 8.03098V8.48591H15.5606V8.19155C15.5427 7.46009 15.3376 6.86244 14.9451 6.39859C14.5704 5.9169 14.0531 5.56901 13.393 5.35493C12.7507 5.123 12.0014 5.00704 11.1451 5.00704C10.5742 5.00704 10.03 5.06948 9.51268 5.19437C8.99531 5.30141 8.53146 5.47981 8.12113 5.72958C7.72864 5.97934 7.41643 6.30939 7.18451 6.71972C6.95258 7.11221 6.83662 7.5939 6.83662 8.16479C6.83662 8.89624 7.01502 9.50282 7.37183 9.98451C7.72864 10.4484 8.19249 10.7962 8.76338 11.0282C9.35211 11.2601 9.98545 11.3761 10.6634 11.3761H12.3225V13.3296H10.7169C10.0033 13.3296 9.31643 13.4188 8.65634 13.5972C7.99624 13.7756 7.46103 14.1056 7.0507 14.5873C6.65822 15.0512 6.46197 15.7202 6.46197 16.5944C6.46197 17.3972 6.6493 18.0484 7.02394 18.5479C7.41643 19.0474 7.96056 19.4131 8.65634 19.6451C9.36995 19.877 10.1906 19.993 11.1183 19.993C12.1174 19.993 12.9469 19.8681 13.607 19.6183C14.2671 19.3685 14.7577 18.985 15.0789 18.4676C15.4 17.9502 15.5606 17.3169 15.5606 16.5676V11.3761H20.1901V13.3563H17.9155V16.4873C17.9155 17.6648 17.6479 18.6639 17.1127 19.4845C16.5953 20.3052 15.8192 20.9296 14.7845 21.3577C13.7498 21.7859 12.4653 22 10.931 22Z\" />" },
	components: { "k-typo-and-paste-dialog": N },
	viewButtons: { "typo-and-paste": A },
	textareaButtons: { "typo-and-paste": {
		icon: "typo-and-paste",
		label: "Typo & Paste",
		click() {
			window.panel.dialog.open({ component: "k-typo-and-paste-dialog" });
		}
	} },
	writerMarks: { "typo-and-paste": {
		get button() {
			return {
				icon: "typo-and-paste",
				label: "Typo & Paste"
			};
		},
		commands() {
			return () => {
				window.panel.dialog.open({ component: "k-typo-and-paste-dialog" });
			};
		},
		get name() {
			return "typo-and-paste";
		}
	} },
	use: [function() {
		P(window, "keydown", (e) => {
			!e.altKey || e.code !== "KeyT" || window.panel.dialog.open({ component: "k-typo-and-paste-dialog" });
		});
	}]
});
//#endregion
