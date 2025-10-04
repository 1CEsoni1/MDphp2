(async()=>{
  const fetch = globalThis.fetch || require('node-fetch');
  try {
    const usersRes = await fetch('http://localhost:3001/api/users');
    const users = await usersRes.json();
    const reqsRes = await fetch('http://localhost:3001/api/repair-requests');
    const reqs = await reqsRes.json();
    console.log('USERS', users && users.length ? users.slice(0,5) : users);
    console.log('REQS', reqs && reqs.length ? reqs.slice(0,5) : reqs);
    if (reqs && reqs.length > 0 && users && users.length > 0) {
      const admin = users.find(u=>u.type_id==='01') || users[0];
      const target = reqs[0];
      console.log('TRY DELETE', target.id, 'as', admin.user_id);
      const delRes = await fetch('http://localhost:3001/api/repair-requests/' + target.id, { method: 'DELETE', headers: { 'x-user-id': admin.user_id } });
      const delJson = await delRes.json().catch(()=>null);
      console.log('DEL RES', delRes.status, delJson);
      const afterRes = await fetch('http://localhost:3001/api/repair-requests');
      const after = await afterRes.json();
      console.log('AFTER COUNT', Array.isArray(after) ? after.length : after);
    }
  } catch (e) {
    console.error('ERR', e);
  }
})();