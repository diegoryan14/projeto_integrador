<?php

require_once("util/param.php");

class Index_Model extends Model
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
                CAD_CARGA.CARGA_ACEITA,
                CAD_CARGA.PRECO,
                CAD_CARGA.CONTEUDO_CARGA,
                CAD_CARGA.DESCRICAO,
                CONCAT(EMP_CAD.NOME, ' - ', EMP_CAD.SEQ_EMPRESA) EMP_CADASTROU,
                EMP_CAD.SEQ_EMPRESA EMPRESA_CADASTROU,
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
                CAD_CARGA.EMPRESA_CADASTROU = EMP_CAD.SEQ_EMPRESA
                AND CAD_CARGA.EMPRESA_DESTINO = EMP_DES.SEQ_EMPRESA
                AND CAD_CARGA.CIDADE_INICIAL = CITY_INI.SEQ_CIDADE
                AND CAD_CARGA.ESTADO_INICIAL = ESTADO_INI.SEQ_ESTADO
                AND CAD_CARGA.CIDADE_FINAL = CITY_FIN.SEQ_CIDADE
                AND CAD_CARGA.ESTADO_FINAL = ESTADO_FIN.SEQ_ESTADO";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function solicitarCarga()
    {
        $post = json_decode(file_get_contents('php://input'));

        $seq_empresa = $post->EMPRESA_CADASTROU;
        $seq_carga = $post->SEQ_CARGA;
        
        Session::init();   
        $o = Session::get('SEQ_USUARIO');
        $seq_usuario = $o;

        $result = $this->db->insert('PEDIDO', array('SEQ_EMPRESA' => $seq_empresa, 'SEQ_CARGA' => $seq_carga, 'USUARIO_SOLICITOU'=> $seq_usuario));

        if($result){
            exit(json_encode(array("code" => "1", "msg" => "Carga solicitada com sucesso!!")));
        } else{
            exit(json_encode(array("code" => "0", "msg" => "Erro ao solicitar a carga!!")));
        }
        echo (json_encode($msg));
    }
}