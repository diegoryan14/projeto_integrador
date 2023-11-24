<?php

require_once("util/param.php");

class login_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function Login()
    {
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post);exit;
        $cpf = $post->CPF;
        $senha = $post->SENHA;
		$dados=array(':CPF' => $cpf,':SENHA' => $senha);
        $result = $this->db->select("SELECT
                                        SEQ_USUARIO,
                                        NOME,
                                        CPF,
                                        SENHA,
                                        TIPO_USUARIO
                                    FROM
                                        USUARIO
                                    WHERE
                                        CPF = :CPF
                                        AND SENHA = sha2(:SENHA,256)
                                        AND ATIVO = 'S'", $dados);
        if (count($result) > 0) {
            // login
            Session::init();
            Session::set('CPF', $result[0]->CPF);
            Session::set('logado', true);
            Session::set('SENHA', $result[0]->SENHA);
            Session::set('NOME', $result[0]->NOME);
            Session::set('TIPO_USUARIO', $result[0]->TIPO_USUARIO);
            Session::set('SEQ', $result[0]->SEQ_USUARIO);
            $msg = array("code" => 1,"msg" => "success", "TIPO_USUARIO" => $result[0]->TIPO_USUARIO);
        }
        else{
            $msg = array("code" => "0", "msg" => "Usuário Inexistente!!");
        }
        echo(json_encode($msg));
    }
    public function LoginEmp()
    {
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post);exit;
        $cnpj = $post->CNPJ;
        $senha = $post->SENHA;
		$dados=array(':CNPJ' => $cnpj,':SENHA' => $senha);
        $result = $this->db->select("SELECT
                                        SEQ_EMPRESA,
                                        NOME,
                                        CPF,
                                        SENHA,
                                        TIPO_USUARIO
                                    FROM
                                        EMPRESA
                                    WHERE
                                        CNPJ = :CNPJ
                                        AND SENHA = sha2(:SENHA,256)
                                        AND ATIVO = 'S'", $dados);
        if (count($result) > 0) {
            // login
            Session::init();
            Session::set('CPF', $result[0]->CPF);
            Session::set('logado', true);
            Session::set('SENHA', $result[0]->SENHA);
            Session::set('NOME', $result[0]->NOME);
            Session::set('TIPO_USUARIO', $result[0]->TIPO_USUARIO);
            Session::set('SEQ', $result[0]->SEQ_EMPRESA);
            $msg = array("code" => 1,"msg" => "success", "TIPO_USUARIO" => $result[0]->TIPO_USUARIO);
        }
        else{
            $msg = array("code" => "0", "msg" => "Usuário Inexistente!!");
        }
        echo(json_encode($msg));
    }
}