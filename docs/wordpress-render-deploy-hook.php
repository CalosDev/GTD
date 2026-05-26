<?php
/**
 * MU plugin sugerido para disparar rebuild del frontend Astro en Render.
 *
 * Uso recomendado:
 * 1. Guardar este archivo como:
 *    wp-content/mu-plugins/gtd-render-deploy-hook.php
 * 2. Definir la constante en wp-config.php:
 *    define('GTD_RENDER_DEPLOY_HOOK_URL', 'https://api.render.com/deploy/srv-xxxx?key=xxxx');
 */

if (!defined('ABSPATH')) {
	exit;
}

if (!defined('GTD_RENDER_DEPLOY_HOOK_URL')) {
	return;
}

function gtd_render_rebuild_allowed_page_slugs() {
	return array(
		'sobre-nosotros',
		'contacto',
		'privacidad',
		'terminos',
		'home-overview',
		'home-featured',
		'home-recent',
	);
}

function gtd_render_rebuild_should_watch_post($post) {
	if (!$post instanceof WP_Post) {
		return false;
	}

	if ($post->post_type === 'contenido_audiovisual') {
		return true;
	}

	if ($post->post_type !== 'page') {
		return false;
	}

	return in_array($post->post_name, gtd_render_rebuild_allowed_page_slugs(), true);
}

function gtd_render_rebuild_trigger($reason) {
	$deploy_hook_url = trim((string) GTD_RENDER_DEPLOY_HOOK_URL);

	if ($deploy_hook_url === '') {
		return;
	}

	$lock_key = 'gtd_render_rebuild_lock';

	if (get_transient($lock_key)) {
		return;
	}

	set_transient($lock_key, 1, 45);

	wp_remote_post(
		$deploy_hook_url,
		array(
			'timeout'   => 5,
			'blocking'  => false,
			'headers'   => array(
				'Content-Type' => 'application/json',
			),
			'body'      => wp_json_encode(
				array(
					'source' => 'wordpress',
					'reason' => $reason,
				)
			),
		)
	);
}

function gtd_render_rebuild_on_save($post_id, $post, $update) {
	if (!$post instanceof WP_Post) {
		return;
	}

	if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
		return;
	}

	if (!gtd_render_rebuild_should_watch_post($post)) {
		return;
	}

	if ($post->post_status !== 'publish') {
		return;
	}

	gtd_render_rebuild_trigger($update ? 'update' : 'publish');
}
add_action('save_post', 'gtd_render_rebuild_on_save', 20, 3);

function gtd_render_rebuild_on_status_transition($new_status, $old_status, $post) {
	if (!$post instanceof WP_Post) {
		return;
	}

	if (!gtd_render_rebuild_should_watch_post($post)) {
		return;
	}

	if ($new_status === $old_status) {
		return;
	}

	if ($new_status !== 'publish' && $old_status !== 'publish') {
		return;
	}

	gtd_render_rebuild_trigger(sprintf('status:%s->%s', $old_status, $new_status));
}
add_action('transition_post_status', 'gtd_render_rebuild_on_status_transition', 20, 3);

function gtd_render_rebuild_on_trash($post_id) {
	$post = get_post($post_id);

	if (!gtd_render_rebuild_should_watch_post($post)) {
		return;
	}

	gtd_render_rebuild_trigger('trash');
}
add_action('trashed_post', 'gtd_render_rebuild_on_trash', 20);

function gtd_render_rebuild_on_delete($post_id) {
	$post = get_post($post_id);

	if (!gtd_render_rebuild_should_watch_post($post)) {
		return;
	}

	gtd_render_rebuild_trigger('delete');
}
add_action('before_delete_post', 'gtd_render_rebuild_on_delete', 20);
