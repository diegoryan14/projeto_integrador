<?php

require_once("util/param.php");

class CadastroLogin_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function Cadastrar_usuario()
    {
        $post = json_decode(file_get_contents('php://input'));
        //var_dump($post);exit;
        $nome = $post->NOME;
        $CPF = $post->CPF;
        $email = $post->EMAIL;
        $senha = $post->SENHA;
        $confirm_senha = $post->CONFIRM_SENHA;

        /* VALIDAR E-MAIL */
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            true;
        } else{
            exit(json_encode(array("code" => "0", "msg" => "Opss!! E-mail está inválido!!")));
        }

        /* VALIDAR CPF */
        $valid_cpf = validaCPF($CPF);
        if($valid_cpf == false){
            exit(json_encode(array("code" => "0", "msg" => "Opss!! CPF inválido!!")));
        }

        /* VALIDAR SENHA */
        if($senha != $confirm_senha){
            exit(json_encode(array("code" => "0", "msg" => "Senha diferentes!!.Por favor, digite novamente.")));
        }

        /* DECODIFICAÇAO DA SENHA */
        $senha_hash = hash('sha256', $senha_final);

        if($nome == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Nome.")));
        }
        else if($CPF == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o CPF.")));
        }
        else if($email == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o E-mail.")));
        }
        else {
            $nome = strtoupper($nome);
            $email = strtolower($email);

            $result = $this->db->insert('USUARIO', array('NOME' =>$nome, 'CPF' => $CPF, 'EMAIL' => $email, 'SENHA' => $senha_hash));

            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso.")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao inserir.")));
            }
        }
        echo (json_encode($msg));

    }
}


function validaCPF($cpf) {
    // Extrai somente os números
    $cpf = preg_replace( '/[^0-9]/is', '', $cpf );
     
    // Verifica se foi informado todos os digitos corretamente
    if (strlen($cpf) != 11) {
        return false;
    }

    // Verifica se foi informada uma sequência de digitos repetidos. Ex: 111.111.111-11
    if (preg_match('/(\d)\1{10}/', $cpf)) {
        return false;
    }

    // Faz o calculo para validar o CPF
    for ($t = 9; $t < 11; $t++) {
        for ($d = 0, $c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }
        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }
    return true;
}