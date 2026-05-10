const fs = require('fs')
const path=require('path')

const FILE_PATH = path.join(__dirname, '../data/posts.json')

function getPosts(){
    const content = fs.readFileSync(FILE_PATH, 'utf8')
    return JSON.parse(content)
}



function ecrirePosts(posts){
    fs.writeFileSync(FILE_PATH, JSON.stringify(posts, null, 2), 'utf8')
}

module.exports = { getPosts , ecrirePosts}