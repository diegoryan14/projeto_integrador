<?php

require_once("util/param.php");

class CadastroCarga_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function cadastrarCarga()
    {
        $post = json_decode(file_get_contents('php://input'));
        var_dump($post);exit;
        $empresa_destino = $post->EMPRESA_DESTINO;
        $peso = $post->PESO;
        $altura = $post->ALTURA;
        $largura = $post->LARGURA;
        $preco = $post->PRECO;
        $estadoInical = $post->ESTADO_INICIAL;
        $cidadeInicial = $post->CIDADE_INICIAL;
        $estadoFinal = $post->ESTADO_FINAL;
        $cidadeInicial = $post->CIDADE_FINAL;
        $dataEntrega = $post->DATA_ENTREGA;
        $dataRetirada = $post->DATA_RETIRADA;
        $descricao = $post->DESCRICAO;
        $produto = $post->PRODUTO;

        
        if($empresa_destino == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, selecione a Empresa Destino.")));
        }
        else if($peso == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Peso da Carga.")));
        }
        else if($peso > 5000){
            exit(json_encode(array("code" => "0", "msg" => "O Peso não pode ser maior que 5.000 Kg.")));
        }
        else if($altura == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o tipo do Produto.")));
        }
        else if($altura > 4){
            exit(json_encode(array("code" => "0", "msg" => "")));
        }
        else if($produto == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o tipo do Produto.")));
        }
        if($quantidade <= 0 && $quantidade >5000){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira uma Quantidade para o item maior zero.")));
        }
        else if($produto == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o tipo do Produto.")));
        }
        else if($email == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o E-mail.")));
        }
        else if($retirada == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira onde será feita a Retirada.")));
        }
        else if($destino == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Destino da Carga.")));
        }
        else {
            $nome = strtoupper($nome);
            //Desconto da empresa
            $valorfreteDesconto = $valorfrete*0.1;
            $valorTotalFrete = $valorfrete*0.9; 

            $result = $this->db->insert('CARGA', array('EMPRESA' =>$empresa, 'PRODUTO' => $produto, 'RETIRADA' => $retirada, 'DESTINO' => $destino, 'QUANTIDADE' => $quantidade, 'VALORFRETE' => $valorTotalFrete));

            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Cadastro do produto realizado com sucesso.")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao inserir.")));
            }
        }
        echo (json_encode($msg));

    }
}
