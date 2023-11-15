<?php

require_once("util/param.php");

class CadastroCarga_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_cargas()
    {
        $sql = 
            "SELECT
                CAD_CARGA.SEQ_CARGA,
                CAD_CARGA.NOME,
                CAD_CARGA.DATA_ENTREGA,
                CAD_CARGA.DATA_SAIDA,
                CAD_CARGA.LARGURA,
                CAD_CARGA.ALTURA ,
                CAD_CARGA.PESO,
                CAD_CARGA.PRECO,
                CAD_CARGA.CONTEUDO_CARGA,
                CAD_CARGA.DESCRICAO,
                CONCAT(EMP_CAD.NOME, ' - ', EMP_CAD.SEQ_EMPRESA) EMP_CADASTROU,
                CONCAT(EMP_DES.NOME, ' - ', EMP_DES.SEQ_EMPRESA) EMP_DESTINO,
                CONCAT(CITY_INI.NOME, ' - ', ESTADO_INI.SIGLA) LOCAL_PARTIDA,
                CONCAT(CITY_FIN.NOME, ' - ', ESTADO_FIN.SIGLA) LOCAL_DESTINO
            FROM
                CADASTRAR_CARGA CAD_CARGA,
                EMPRESA EMP_CAD,
                EMPRESA EMP_DES,
                CIDADE CITY_INI,
                CIDADE CITY_FIN,
                ESTADO ESTADO_INI,
                ESTADO ESTADO_FIN
            WHERE
                CAD_CARGA.CARGA_ACEITA = 'N'
                AND CAD_CARGA.EMPRESA_CADASTROU = EMP_CAD.SEQ_EMPRESA
                AND CAD_CARGA.EMPRESA_DESTINO = EMP_DES.SEQ_EMPRESA
                AND CAD_CARGA.CIDADE_INICIAL = CITY_INI.SEQ_CIDADE
                AND CAD_CARGA.ESTADO_INICIAL = ESTADO_INI.SEQ_ESTADO
                AND CAD_CARGA.CIDADE_FINAL = CITY_FIN.SEQ_CIDADE
                AND CAD_CARGA.ESTADO_FINAL = ESTADO_FIN.SEQ_ESTADO";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function get_empresa()
    {
        $sql = "SELECT
                    SEQ_EMPRESA SEQ,
                    NOME
                FROM
                    EMPRESA E 
                WHERE
                    E.ATIVO = 'S'";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function get_estado()
    {
        $sql = "SELECT
                    E.SEQ_ESTADO SEQ,
                    CONCAT(E.NOME, ' (', E.SIGLA ,')') NOME
                FROM
                    ESTADO E
                ORDER BY
                    NOME";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function get_cidade()
    {
        $sql = "SELECT
                    C.SEQ_CIDADE SEQ,
                    CONCAT(C.NOME, ' (', E.SIGLA ,')') NOME
                FROM
                    CIDADE C,
                    ESTADO E
                WHERE
                    C.COD_ESTADO = E.SEQ_ESTADO
                ORDER BY
                    NOME";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function cadastrarCarga()
    {
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post);exit;
        $empresa_destino = $post->EMPRESA_DESTINO;
        // $empresa_destino = 1;
        $peso = $post->PESO;
        $altura = $post->ALTURA;
        $largura = $post->LARGURA;
        $preco = $post->PRECO;
        $estadoInical = $post->ESTADO_INICIAL;
        $cidadeInicial = $post->CIDADE_INICIAL;
        $estadoFinal = $post->ESTADO_FINAL;
        $cidadeFinal = $post->CIDADE_FINAL;
        // $dataEntrega = $post->DATA_ENTREGA;
        // $dataRetirada = $post->DATA_RETIRADA;
        $descricao = $post->DESCRICAO;
        // $produto = $post->PRODUTO;
        
        Session::init();   
        $o = Session::get('SEQ_USUARIO');
        $empresa_cadastrou = $o;
        
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
        // else if($dataEntrega == null){
        //     exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Data de Entrega da Carga.")));
        // }
        // else if($dataRetirada == null){
        //     exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Data de Rertira da Carga.")));
        // }
        // else if($produto == null){
        //     exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Produto que será transportado.")));
        // }
        else {
            $result = $this->db->insert('CADASTRAR_CARGA', array(
                'EMPRESA_DESTINO' => $empresa_destino,
                'EMPRESA_CADASTROU' => $empresa_cadastrou,
                'PESO' => $peso, 
                'ALTURA' => $altura, 
                'LARGURA' => $largura,
                'PRECO' => $preco,
                'ESTADO_INICIAL' => $estadoInical,
                'CIDADE_INICIAL' => $cidadeInicial,
                'ESTADO_FINAL' => $estadoFinal,
                'CIDADE_FINAL' => $cidadeFinal,
                // 'DATA_REGISTRO' => 
                // 'DATA_ENTREGA' => $dataEntrega,
                // 'DATA_RETIRADA' => $dataRetirada,
                'DESCRICAO' => $descricao
                // 'PRODUTO' => $produto
            ));
            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso.")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao inserir.")));
            }
        }
        echo (json_encode($msg));

    }
}
