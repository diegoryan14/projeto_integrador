<?php

require_once("util/param.php");

class Perfil_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getUsuario()
    {
        $post = json_decode(file_get_contents('php://input'));
        
        Session::init();   
        $o = Session::get('CPF');
        $CPF = $o;

        $dados=array(':CPF' => $CPF);
        $result = $this->db->select("SELECT
                                        SEQ_USUARIO,
                                        NOME,
                                        CPF,
                                        EMAIL,
                                        -- CELULAR,
                                        -- DATA_NASCIMENTO,
                                        TIPO_USUARIO
                                    FROM
                                        USUARIO
                                    WHERE
                                        CPF = :CPF
                                        AND ATIVO = 'S'", $dados);
        echo (json_encode($result));
        // if (count($result) > 0) {
        //     $msg = array("code" => 1,"msg" => "success");
        // }
        // else{
        //     $msg = array("code" => "0", "msg" => "Usuário não encontrado!!");
        // }
    }

    public function salvarPerfil()
    {
        $post = json_decode(file_get_contents('php://input'));

        $nome = $post->NOME;
        $email = $post->EMAIL;
        // $celular = $post->CELULAR;
        // $data_nascimento = $post->DATA_NASCIMENTO;

        Session::init();   
        $o = Session::get('CPF');
        $cpf = $o;
        
        $dadosSave = array('NOME' => $nome, 'EMAIL' => $email /*, 'CELULAR' => $celular, 'DATA_NASCIMENTO' => $data_nascimento*/);
        $result = $this->db->update('JOBTRUCKER.USUARIO', $dadosSave,"CPF=$cpf");
        if($result){
            exit(json_encode(array("code" => "1", "msg" => "Dados atualizado com Sucesso!!")));
        } else{
            exit(json_encode(array("code" => "0", "msg" => "Erro atualizar os dados, Tente novamente mais tarde.")));
        }
        echo (json_encode($msg));
    }
}