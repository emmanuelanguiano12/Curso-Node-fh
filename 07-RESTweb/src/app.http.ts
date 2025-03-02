import http from 'http';
import fs from 'fs'

const server = http.createServer((req, res) => {
    
    console.log(req.url);

    // res.writeHead(200, { 'content-type': 'text/html' })
    // res.write(`<h1>Hola mundo desde ${req.url}</h1>`)

    // const data = {name: 'Emmanuel', age: 22, city: 'Colima'}
    // res.writeHead(200, { 'content-type': 'application/json' })
    // res.write(JSON.stringify(data))

    if (req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(htmlFile)
        res.end()

        return;
    }

    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'content-type': 'application/javascript'})
    } else if(req.url?.endsWith('.css')){
        res.writeHead(200, {'content-type': 'text/css'})
    }

    const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8')
    res.end(responseContent)

})

server.listen(8080, () => {
    console.log('Server running on port 8080')
})