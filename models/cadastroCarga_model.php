<?php

require_once("util/param.php");

class CadastroCarga_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function Cadastrar_carga()
    {
        $post = json_decode(file_get_contents('php://input'));
        //var_dump($post);exit;
        $empresa = $post->NOME_EMPRESA;
        $produto = $post->PRODUTO;
        $retirada = $post->RETIRADA;
        $destino = $post->DESTINO;
        $quantidade = $post->SENHA;
        $valorfrete = $post->VALORFRETE;

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
