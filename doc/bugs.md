## trigger res.on('data') after res.('end)
state: fixed in v0.2.0

### descriptor
1. excute wf.createReadStream(`https://nodejs.prg/en/`)
2. after httpIncommingMessage.on('end')
3. still trigger httpIncommingMessage.on('data') once, and chunk is a part of html file
4. can not reproduce it again when I directly use htts.get() outside wf.createReadStream
5. cause an error: push data to readableStream after rs.push(null)

### how to fix
I add a logic: `if (rs._readableState.ended === true) return null` when res.on('data')

but I still don't know fix this bug directly.