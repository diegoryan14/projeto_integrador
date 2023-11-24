<?php

require_once("util/param.php");

class Cadastrocaminhao_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function cadastrarCaminhao()
    {
        $post = json_decode(file_get_contents('php://input'));

        
        $placa_caminhao = 'null';
        $modelo_caminhao = 'null';
        $modelo_carreta = 'null';
        $placa_carreta = 'null';
        $descricao = 'null';

        $placa_caminhao = $post->PLACA_CAMINHAO;
        $modelo_caminhao = $post->MODELO_CAMINHAO;
        $modelo_carreta = $post->MODELO_CARRETA;
        $placa_carreta = $post->PLACA_CARRETA;
        if(isset($post->DESCRICAO)){
            $descricao = $post->DESCRICAO;
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
        // else if($modelo_carreta == null){
        //     exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Modelo da Carreta.")));
        // }
        // else if($placa_carreta == null){
        //     exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Placa da Carreta.")));
        // }
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