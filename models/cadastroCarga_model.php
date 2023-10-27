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
        $cidadeFinal = $post->CIDADE_FINAL;
        $dataEntrega = $post->DATA_ENTREGA;
        $dataRetirada = $post->DATA_RETIRADA;
        $descricao = $post->DESCRICAO;
        $produto = $post->PRODUTO;


        // $empresa_destino = 
        
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
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Altura da Carga.")));
        }
        else if($altura > 4){
            exit(json_encode(array("code" => "0", "msg" => "A Altura não pode ser maior que 4 metros.")));
        }
        else if($largura == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Largura da Carga.")));
        }
        else if($largura > 3){
            exit(json_encode(array("code" => "0", "msg" => "A Largura não pode ser maior que 3 metros.")));
        }
        else if($preco == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o tipo do Produto.")));
        }
        else if($estadoInical == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, selecione o Estado de Partida.")));
        }
        else if($cidadeInicial == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, selecione a Cidade de Partida.")));
        }
        else if($estadoFinal == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, Selecione o Estado de Entrega.")));
        }
        else if($cidadeFinal == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, selecione a Cidade de Entrega.")));
        }
        else if($dataEntrega == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Data de Entrega da Carga.")));
        }
        else if($dataRetirada == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Data de Rertira da Carga.")));
        }
        else if($produto == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Produto que será transportado.")));
        }
        else {
            $result = $this->db->insert('CADASTRAR_CARGA', array(
                'EMPRESA_DESTINO' => $empresa_destino,
                // 'EMPRESA_CADASTROU' => $empresa_cadastrou,
                'PESO' => $peso, 
                'ALTURA' => $altura, 
                'LARGURA' => $largura,
                'PRECO' => $preco,
                'ESTADO_INICIAL' => $estadoInical,
                'CIDADE_INICIAL' => $cidadeInicial,
                'ESTADO_FINAL' => $estadoFinal,
                'CIDADE_FINAL' => $cidadeFinal,
                // 'DATA_REGISTRO' => 
                'DATA_ENTREGA' => $dataEntrega,
                'DATA_RETIRADA' => $dataRetirada,
                'DESCRICAO' => $descricao,
                'PRODUTO' => $produto
            ));
            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Cadastro do produto realizado com sucesso.")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao inserir.")));
            }
        }
        echo (json_encode($msg));

    }
}
