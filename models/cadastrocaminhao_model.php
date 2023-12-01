<?php

require_once("util/param.php");

class Cadastrocaminhao_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getDadosCaminhao(){
        
        Session::init();   
        $o = Session::get('SEQ');
        $DONO = $o;

        $dados=array(':DONO' => $DONO);
        $result = $this->db->select("SELECT
                                        SEQ_CAMINHAO,
                                        PLACA_CAMINHAO,
                                        PLACA_CARRETA,
                                        MODELO_CAMINHAO,
                                        MODELO_CARRETA,
                                        DESCRICAO
                                    FROM
                                        CADASTRAR_CAMINHAO
                                    WHERE
                                        DONO_CAMINHAO = :DONO", $dados);
        echo (json_encode($result));
    }

    public function cadastrarCaminhao()
    {
        $post = json_decode(file_get_contents('php://input'));

        $placa_caminhao = '';
        $modelo_caminhao = '';
        $modelo_carreta = '';
        $placa_carreta = '';
        $descricao = '';

        $placa_caminhao = $post->PLACA_CAMINHAO;
        $modelo_caminhao = $post->MODELO_CAMINHAO;
        if(isset($post->MODELO_CARRETA)){
            $modelo_carreta = $post->MODELO_CARRETA;
        }
        if(isset($post->PLACA_CARRETA)){
            $placa_carreta = $post->PLACA_CARRETA;
        }
        if(isset($post->DESCRICAO)){
            $descricao = $post->DESCRICAO;
        }

        Session::init();   
        $o = Session::get('SEQ');
        $DONO = $o;

        $dados=array(':DONO' => $DONO);
        $result = $this->db->select("SELECT
                                        MAX(SEQ_CAMINHAO) SEQ
                                    FROM
                                        CADASTRAR_CAMINHAO
                                    WHERE
                                        DONO_CAMINHAO = :DONO", $dados);
        // var_dump($result);exit;
        if($result[0]->SEQ > 0){
            
            $dadosSave = array('DONO_CAMINHAO'=> $DONO, 'MODELO_CAMINHAO' =>$modelo_caminhao, 'PLACA_CAMINHAO' => $placa_caminhao, 'MODELO_CARRETA' => $modelo_carreta, 'PLACA_CARRETA' => $placa_carreta, 'DESCRICAO' => $descricao);
            $result = $this->db->update('JOBTRUCKER.CADASTRAR_CAMINHAO', $dadosSave,"DONO_CAMINHAO=$DONO");

            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Dados atualizados com sucesso!!")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao Cadastrar!!")));
            }
        }
        
        Session::init();   
        $o = Session::get('SEQ');
        $seq_usuario = $o;

        if($modelo_caminhao == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Modelo do Caminhão.")));
        }
        else if($placa_caminhao == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Placa do Caminhão.")));
        }
        else {

            $result = $this->db->insert('CADASTRAR_CAMINHAO', array('DONO_CAMINHAO'=> $seq_usuario, 'MODELO_CAMINHAO' =>$modelo_caminhao, 'PLACA_CAMINHAO' => $placa_caminhao, 'MODELO_CARRETA' => $modelo_carreta, 'PLACA_CARRETA' => $placa_carreta, 'DESCRICAO' => $descricao));

            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso!!")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao Cadastrar!!")));
            }
        }
        echo (json_encode($msg));

    }
}