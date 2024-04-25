<?php

$subject = "You have been contacted ";
$success_message = "Your message has been sent successfully!";
$fail_message = "Sorry, something went wrong! Please try again.";

$admin_email = 'kevinsumner20@gmail.com';

$validate = true;
$name = filter_var($_POST['name'], FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$msg = filter_var($_POST['message'], FILTER_SANITIZE_SPECIAL_CHARS);

if (!($name && $email && $msg)) {
	$validate = FALSE;
}

if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");


$e_body = "You have been contacted by $name." . PHP_EOL . PHP_EOL;
$e_content = "\"$msg\"" . PHP_EOL . PHP_EOL;
$e_reply = "you can contact $name by E-mail, $email";


$message = wordwrap( $e_body . $e_content . $e_reply, 70 );

$headers = "From: $email" . PHP_EOL;
$headers .= "Reply-To: $email" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

if ($validate && mail( $admin_email, "$subject da $name", $message, $headers)) {
	echo $success_message;
} else {
	echo $fail_message;
};
