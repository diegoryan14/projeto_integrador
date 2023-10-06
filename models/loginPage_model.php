<?php

require_once("util/param.php");

class loginPage_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function Login()
    {
        $post = json_decode(file_get_contents('php://input'));
        var_dump($post);exit;
        $cpf = $post->CPF;
        $senha = $post->SENHA;
		$dados=array(':CPF' => $cpf,':SENHA' => $senha);
        $result = $this->db->select("", $dados);
        if (count($result) > 0) {
            // login
            // Session::init();
            // Session::set('CPF', $result[0]->CPF);
            // Session::set('logado', true);
            // Session::set('SENHA', $result[0]->SENHA);
            // Session::set('NOME', $result[0]->NOME);
            // $msg = array("code" => 1,"msg" => "success");
        }
        else{
            $msg = array("code" => "0", "msg" => "Usuário Inexistente!!");
        }
        echo(json_encode($msg));
    }
}