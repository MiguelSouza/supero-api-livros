const db = require("../config/database");

exports.salvarLivro = async (req, res, next) => {
  try{
    const { titulo, isbn, autor, editora, ano, idioma, peso, comprimento, largura, altura } = req.body;
    const { rows } = await db.query(
      "INSERT INTO public.livros (titulo, isbn, autor, editora, ano, idioma, peso, comprimento, largura, altura) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [titulo, isbn, autor, editora, ano, idioma, peso, comprimento, largura, altura]
    );
  
    res.status(200).send({
      message: "Livro cadastro com sucesso!",
      body: {
        livro: { titulo, isbn, autor, editora, ano, idioma, peso, comprimento, largura, altura }
      },
    });
  }catch(error){
    res.send({    
      error: 'Error',
      message: error.message    
    })  
  }
};

exports.editarLivro = async (req, res, next) => {
  try{
    const livroId = parseInt(req.params.id);
    const { titulo, isbn, autor, editora, ano, idioma, peso, comprimento, largura, altura } = req.body;
    const response = await db.query(
        "UPDATE public.livros SET titulo = $1, isbn = $2, autor = $3, editora = $4, ano = $5,"+
        "idioma = $6, peso = $7, comprimento = $8, largura = $9, altura = $10 WHERE id = $11",
        [titulo, isbn, autor, editora, ano, idioma, peso, comprimento, largura, altura, livroId]
    );
    res.status(200).send({ message: "Livro atualizado com sucesso!" });
  }catch(error){
    res.send({    
      error: 'Error',
      message: error.message    
    })  
  }
};

exports.deletarLivro = async (req, res, next) => {
  try{  
    const livroId = parseInt(req.params.id);
    await db.query('DELETE FROM livros WHERE id = $1', [
        livroId
    ]);
    res.status(200).send({ message: 'Livro deletado com sucesso!', productId });
  }catch(error){
    res.send({    
      error: 'Error',
      message: error.message    
    })  
  }
};

exports.listLivros = async (req, res, next) => {
  try{ 
    var conditions = []
    var conditionsSQL = ""
    for ( var query in req.query ){
      conditions.push(query)
      conditionsSQL += "upper(" + query + ")" + " like '%" + req.query[query].toUpperCase() + "%'" + 
      (conditions.length < Object.keys(req.query).length ? " OR " : "")
    }
    const response = await db.query(
      "SELECT * FROM public.livros " + 
      (req.params.id ? "WHERE ID = " + req.params.id : (conditions.length > 0 ? "WHERE " + conditionsSQL : "")) 
    );
    res.status(200).send({quantidade: response.rows.length, data: response.rows});   
  }catch(error){
    res.send({    
      error: 'Error',
      message: error.message    
    })  
  }
}; 