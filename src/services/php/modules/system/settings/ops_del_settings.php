<?php
if(!defined('QWP_ROOT')){exit('Invalid Request');}

function del_settings(&$msg, &$data) {
    global $F;

}
qwp_set_ops_process('del_settings', true);
qwp_set_form_validator('settings');
define('IN_MODULE', 1);
require_once(QWP_CORE_ROOT . '/tmpl_json_ops.php');
