/*! Eretek Online Araçlar #57 — Geri Yükleme Süresi Hesabı */
ERT.def('57', {
	run: function (v, c) {
		var xfer = v.size * 1000 / v.rate, setup = (v.setup || 0) * 60, verify = (v.verify || 0) * 60, tot = xfer + setup + verify, vv = { hours: Math.round(tot / 3600 * 1000) / 1000 };
		var kv = [[c.t('xfer'), c.dur(xfer)], [c.t('setup'), c.dur(setup)], [c.t('verify'), c.dur(verify)], [c.t('tot'), c.dur(tot)]], msgs = [];
		if (v.rto) { var r = v.rto * 3600; vv.meets = tot <= r; kv.push([c.t('rto'), c.dur(r)]); msgs.push(tot <= r ? ['ok', c.t('ok', { m: c.dur(r - tot) })] : ['err', c.t('miss', { m: c.dur(tot - r) })]); if (tot <= r && tot > r * 0.8) { msgs.push(['warn', c.t('tight')]); } }
		msgs.push(['info', c.t('rateNote')]);
		return { big: c.dur(tot), kv: kv, msgs: msgs, x: { copy: kv.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n') }, v: vv };
	}
});
