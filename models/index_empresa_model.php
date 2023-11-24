<?php

require_once("util/param.php");

class Index_empresa_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }
    public function get_cargas()
    {
        
        Session::init();   
        $o = Session::get('SEQ');
        // $empresa_cadastrou = $o;
        $empresa_cadastrou = 1;

        $dados=array(':par_EMPRESA' => $empresa_cadastrou);
        $result = $this->db->select("SELECT
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
            CONCAT(CITY_FIN.NOME, ' - ', ESTADO_FIN.SIGLA) LOCAL_DESTINO,
            (
                SELECT
                    COUNT(*)
                FROM
                    PEDIDO P
                WHERE
                    CAD_CARGA.SEQ_CARGA = P.SEQ_CARGA 
            ) EXISTE_PEDIDO
        FROM
            CADASTRAR_CARGA CAD_CARGA,
            EMPRESA EMP_CAD,
            EMPRESA EMP_DES,
            CIDADE CITY_INI,
            CIDADE CITY_FIN,
            ESTADO ESTADO_INI,
            ESTADO ESTADO_FIN
        WHERE
            CAD_CARGA.EMPRESA_CADASTROU = :par_EMPRESA
            AND CAD_CARGA.EMPRESA_CADASTROU = EMP_CAD.SEQ_EMPRESA
            AND CAD_CARGA.EMPRESA_DESTINO = EMP_DES.SEQ_EMPRESA
            AND CAD_CARGA.CIDADE_INICIAL = CITY_INI.SEQ_CIDADE
            AND CAD_CARGA.ESTADO_INICIAL = ESTADO_INI.SEQ_ESTADO
            AND CAD_CARGA.CIDADE_FINAL = CITY_FIN.SEQ_CIDADE
            AND CAD_CARGA.ESTADO_FINAL = ESTADO_FIN.SEQ_ESTADO", $dados);
        echo (json_encode($result));
    }

    public function aceitarCarga()
    {
        $post = json_decode(file_get_contents('php://input'));

        $seq_carga = $post->SEQ_CARGA;
        
        Session::init();   
        $o = Session::get('SEQ');
        $seq_usuario = $o;

        $dadosSave = array('EMPRESA_ACEITOU' => 'S');
        $result = $this->db->update('JOBTRUCKER.PEDIDO', $dadosSave,"SEQ_CARGA=$seq_carga");
        
        $dadosSave = array('CARGA_ACEITA' => 'S');
        $result = $this->db->update('JOBTRUCKER.CADASTRAR_CARGA', $dadosSave,"SEQ_CARGA=$seq_carga");

        if($result){
            exit(json_encode(array("code" => "1", "msg" => "Carga aceita com sucesso!!")));
        } else{
            exit(json_encode(array("code" => "0", "msg" => "Erro ao aceitar a carga!!")));
        }
        echo (json_encode($msg));
    }
}