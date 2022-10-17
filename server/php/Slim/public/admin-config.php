<?php
$menus = $subArray = array();

// ------------------------------------ Dashboard -----------------------------------------
$subArray = array();
$subArray['title'] = 'Dashboard';
$subArray['api'] = 'dashboard';
$subArray['role_id'] = [1,4];
$subArray['route'] = '/admin/dashboard';
$subArray['icon_class'] = 'fa fa-fw fa-dashboard';
$menus[] = $subArray;

// -------------------------------------- Users --------------------------------------------
$subArray['title'] = 'Users';
$subArray['role_id'] = [1];
$subArray['route'] = '/admin/actions/users';
$subArray['api'] = '/admin/users';
$subArray['query'] = 'users';
$subArray['icon_class'] = 'fa fa-users';
$subArray['add'] = [];
$subArray['add']['url'] = '/admin/users/add';
$field = array();
$field['name'] = 'id';
$field['label'] = 'ID';
$field['add'] = false;
$field['list'] = true;
$field['edit'] = false;
$field['view'] = false;
$fieldList[] = $field;

//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/users/edit';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;

$action = array();
$action['api'] = '/users/view';
$action['label'] = 'view';
$action['class'] = 'btn crud-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;

$action = array();
$action['api'] = '/users/delete';
$action['label'] = 'Delete';
$action['class'] = 'btn crud-action btn-danger';
$action['icon'] = 'fa fa-trash';
$field['listActions'][] = $action;
$field['list'] = true;
$listFieldList[] = $field;
$subArray['listview']['fields'] = $listFieldList;

$field = array();
$field['name'] = 'username';
$field['label'] = 'Username';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['value'] = '';
$field['add'] = true;
$field['list'] = true;
$field['edit'] = true;
$field['view'] = true;
$field['is_required'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'first_name';
$field['label'] = 'First Name';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = true;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'last_name';
$field['label'] = 'Last Name';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = true;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'email';
$field['label'] = 'Email';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = true;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'paypal_email';
$field['label'] = 'Paypal Email';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = false;
$field['add'] = true;
$field['list'] = false;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'address.addressline1';
$field['label'] = 'Address 1';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = false;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'address.addressline2';
$field['label'] = 'Address 2';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = false;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'address.city';
$field['label'] = 'City';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = false;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'address.state';
$field['label'] = 'State';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = false;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'address.country';
$field['label'] = 'Country';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = false;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'address.zipcode';
$field['label'] = 'Zipcode';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = false;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'image';
$field['label'] = 'Profile Image';
$field['is_required'] = true;
$field['add'] = true;
$field['list'] = false;
$field['edit'] = true;
$field['view'] = true;
$field['value'] = '';
$field['class'] = '';
$field['type'] = 'file';
$fieldList[] = $field;

$subArray['add']['fields'] = $fieldList;

// $subArray['delete'] = [];
// $subArray['delete']['url'] = '/users/delete';
$fieldList = array();
$field = array();
$field['name'] = 'id';
$field['label'] = 'ID';
$fieldList[] = $field;

//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/users/edit';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;

$action = array();
$action['api'] = '/users/view';
$action['label'] = 'view';
$action['class'] = 'btn crud-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;

$action = array();
$action['api'] = '/users/delete';
$action['label'] = 'Delete';
$action['class'] = 'btn crud-action btn-danger';
$action['icon'] = 'fa fa-trash';
$subArray['listActions'][] = $action;
$subArray['title'] = 'Users';

$filter = array();
$filter['name'] = 'q';
$filter['label'] = 'Search';
$subArray['filters'][] = $filter;
$menus[] = $subArray;

// ------------------------------------------- Companies ----------------------------
$subArray = array();
$fieldList = array();
$subArray['title'] = 'Companies';
$subArray['role_id'] = [1];
$subArray['query'] = 'companies';
$subArray['route'] = '/admin/actions/companies';
$subArray['icon_class'] = 'fa fa-building';
$menus[] = $subArray;

// --------------------------------------- Contestant ---------------------------------
$subArray = array();
$fieldList = array();
$subArray['title'] = 'Contestants';
$subArray['query'] = 'contestants';
$subArray['role_id'] = [1,4];
$subArray['route'] = '/admin/actions/contestants';
$subArray['icon_class'] = 'fa fa-female';
$field = array();
$field['name'] = 'category';
$field['label'] = 'Category';
$field['type'] = 'tags';
$field['is_required'] = true;
$field['reference'] = '/categories';
$field['value'] = array();
$field['options'] = array();
$field['add'] = false;
$field['list'] = true;
$field['edit'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'company_id';
$field['option_name'] = 'username';
$field['label'] = 'Company';
$field['reference'] = '/admin/users';
$field['query'] = 'companies';
$field['type'] = 'select';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = true;
$field['edit'] = true;
$field['view'] = true;
$fieldList[] = $field;

$subArray['add']['fields'] = $fieldList;
$subArray['edit']['fields'] = $fieldList;
$subArray['view']['fields'] = $fieldList;
$menus[] = $subArray;

// ------------------------------------ Votes --------------------------------
$fieldList = array();
$subArray = array();
$subArray['title'] = 'Votes';
$subArray['role_id'] = [1,4];
$subArray['icon_class'] = 'fa fa-book';
$subArray['listview']['fields'] = array();

$childMenu = array();
$childMenu['title'] = 'Contestant Votes';
$childMenu['api'] = '/admin/votes';
$childMenu['route'] = '/admin/actions/votes';
$childMenu['icon_class'] = 'fa fa-ticket';

$field = array();
$field['name'] = 'id';
$field['label'] = 'Id';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

// $field = array();
// $field['name'] = 'category.name';
// $field['label'] = 'Category';
// $field['list'] = true;
// $fieldList[] = $field;

$field = array();
$field['name'] = 'username';
$field['label'] = 'User Name';
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'first_name';
$field['label'] = 'First Name';
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'last_name';
$field['label'] = 'Last Name';
$field['list'] = true;
$fieldList[] = $field;

// $field = array();
// $field['name'] = 'name';
// $field['label'] = 'category';
// $field['multiple'] = false;
// $field['type'] = 'searchable';
// $field['child_drop'] = 1;
// $field['is_required'] = true;
// $field['reference'] = '/categories';
// $field['is_dependent'] = true;
// $field['dependent_api'] = '/contestants';
// $field['dependent_name'] = 'first_name';
// $field['value'] = array();
// $field['options'] = array();
// $field['config'] = array(
	// 'displayKey' => 'name',
	// 'search'=> true,
	// 'height'=> 'auto',
	// 'placeholder'=> 'Select',
	// 'noResultsFound'=> 'No results found!',
	// 'searchPlaceholder' => 'Search'
// );
// $field['add'] = true;
// $field['list'] = false;
// $fieldList[] = $field;

$field = array();
$field['name'] = 'first_name';
$field['option_name'] = 'fullname';
$field['label'] = 'Contestants';
$field['type'] = 'select';
$field['is_required'] = true;
$field['reference'] = '/contestants';
$field['value'] = array();
$field['options'] = array();
$field['add'] = true;
$field['list'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'votes';
$field['label'] = 'Votes';
$field['type'] = 'number';
$field['is_required'] = true;  
$field['list'] = true;
$field['add'] = true;
$fieldList[] = $field;

$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;

$childMenu = array();
$fieldList = array();
$childMenu['title'] = 'Company Votes';
$childMenu['api'] = '/admin/company_votes';
$childMenu['route'] = '/admin/actions/company_votes';
$childMenu['icon_class'] = 'fa fa-ticket';

$field = array();
$field['name'] = 'id';
$field['label'] = 'Id';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'username';
$field['label'] = 'Company Name';
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'votes';
$field['label'] = 'Votes';
$field['type'] = 'number';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = false;
$fieldList[] = $field;

$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;

$childMenu = array();
$fieldList = array();
$childMenu['title'] = 'Category Votes';
$childMenu['api'] = '/admin/category_votes';
$childMenu['route'] = '/admin/actions/category_votes';
$childMenu['icon_class'] = 'fa fa-ticket';

$field = array();
$field['name'] = 'id';
$field['label'] = 'Id';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'category_name';
$field['label'] = 'Category Name';
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'votes';
$field['label'] = 'Votes';
$field['type'] = 'number';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = false;
$fieldList[] = $field;

$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;

$subArray['add']['fields'] = $fieldList;
$menus[] = $subArray;
// $subArray = array();
// $fieldList = array();
// $subArray['title'] = 'Instant Votes';
// $subArray['route'] = '/admin/actions/instant_votes';
// $subArray['api'] = '/admin/instant_votes';
// $subArray['icon_class'] = 'fa fa-users';
// $fieldList = array();
//
// $field = array();
// $field['name'] = 'id';
// $field['label'] = 'Id';
// $field['list'] = true;
// $fieldList[] = $field;
//
// $field = array();
// $field['name'] = 'first_name';
// $field['label'] = 'First Name';
// $field['list'] = true;
// $fieldList[] = $field;
//
// $field = array();
// $field['name'] = 'last_name';
// $field['label'] = 'Last Name';
// $field['list'] = true;
// $fieldList[] = $field;
//
// $field = array();
// $field['name'] = 'first_name';
// $field['label'] = 'Contestants';
// $field['type'] = 'tags';
// $field['is_required'] = true;
// $field['reference'] = '/contestants';
// $field['value'] = array();
// $field['options'] = array();
// $field['add'] = true;
// $field['list'] = false;
// $fieldList[] = $field;
//
// $field = array();
// $field['name'] = 'votes';
// $field['label'] = 'Votes';
// $field['list'] = true;
// $field['add'] = true;
// $fieldList[] = $field;
//
// $subArray['listview']['fields'] = $fieldList;
//
// $subArray['add']['fields'] = $fieldList;
// $menus[] = $subArray;


// -------------------------- Profile Media Approval ----------------------------------------
$subArray = array();
$fieldList = array();
$subArray['title'] = 'Approvals';
$subArray['role_id'] = [1];
$subArray['api'] = '/admin/approvals';
$subArray['route'] = '/admin/actions/approvals';
$subArray['icon_class'] = 'fa fa-check-circle';
$subArray['approve'] = [];
$subArray['approve']['url'] = '/api/v1/admin/approvals';
$subArray['disapprove'] = [];
$subArray['disapprove']['url'] = '/api/v1/admin/approvals';

//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['label'] = 'view';
$action['class'] = 'btn crud-approval-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;

$action = array();
$action['label'] = 'Approve';
$action['class'] = 'btn crud-approval-action btn-primary';
$action['icon'] = 'fa fa-check';
$field['listActions'][] = $action;

$action = array();
$action['label'] = 'Disapprove';
$action['class'] = 'btn crud-approval-action btn-danger';
$action['icon'] = 'fa fa-trash';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'user_category.category.name';
$field['label'] = 'Category';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;


$field = array();
$field['name'] = 'user.first_name';
$field['label'] = 'First Name';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'user.last_name';
$field['label'] = 'Last Name';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'image';
$field['label'] = 'Attachment';
$field['type'] = 'file';
$field['list'] = false;
$field['view'] = true;
$fieldList[] = $field;

$subArray['listview']['fields'] = $fieldList;
$menus[] = $subArray;

// Orders
// $fieldList = array();
// $listFieldList = array();
// $subArray = array();
// $subArray['title'] = 'Track Orders';
// $subArray['api'] = '/admin/track_orders';
// $subArray['route'] = '/admin/actions/track_orders';
// $subArray['icon_class'] = 'fa fa-users';

//actions
// $field = array();
// $field['name'] = 'actions';
// $field['label'] = 'Actions';
// $field['listActions'] = array();

// $action = array();
// $action['api'] = '/users/edit';
// $action['label'] = 'Edit';
// $action['class'] = 'btn crud-action btn-primary';
// $action['icon'] = 'fa fa-pencil';
// $field['listActions'][] = $action;
// $field['list'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'created_at';
// $field['label'] = 'Created';
// $field['list'] = true;
// $field['edit'] = false;
// $field['view'] = false;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'updated_at';
// $field['label'] = 'Updated';
// $field['list'] = true;
// $field['edit'] = false;
// $field['view'] = false;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'invoice_no';
// $field['label'] = 'Invoice No';
// $field['list'] = true;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'shipping_status';
// $field['label'] = 'Shipping Status';
// $field['list'] = true;
// $field['edit'] = true;
// $field['type'] = 'text';
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'otp';
// $field['label'] = 'OTP On Delivery';
// $field['list'] = true;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'user.first_name';
// $field['label'] = 'First Name';
// $field['list'] = true;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'user.last_name';
// $field['label'] = 'Last Name';
// $field['list'] = true;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'detail.product.name';
// $field['label'] = 'Product';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'detail.color.color';
// $field['label'] = 'Color';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'detail.size.size.name';
// $field['label'] = 'Size';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'price';
// $field['label'] = 'Price';
// $field['list'] = true;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'quantity';
// $field['label'] = 'Quantity';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'addressline1';
// $field['label'] = 'Addressline1';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'addressline2';
// $field['label'] = 'Addressline2';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'city';
// $field['label'] = 'City';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'state';
// $field['label'] = 'State';
// $field['list'] = false;
// $field['edit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'country';
// $field['label'] = 'Country';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'zipcode';
// $field['label'] = 'Zipcode';
// $field['list'] = false;
// $field['edit'] = true;
// $field['isNotEdit'] = true;
// $fieldList[] = $field;

// $subArray['listview']['fields'] = $fieldList;
// $menus[] = $subArray;

// ------------------------------------ Transactions -----------------------------------------
$fieldList = array();
$subArray = array();
$subArray['title'] = 'Transactions';
$subArray['role_id'] = [1];
$subArray['icon_class'] = 'fa fa-users';
$subArray['route'] = '/admin/actions/transactions';
//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['view'] = false;
$field['listActions'] = array();

$action = array();
$action['api'] = '/users/view';
$action['label'] = 'view';
$action['class'] = 'btn crud-approval-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;
$field['list'] = true;
$field['view'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'id';
$field['label'] = 'ID';
$field['list'] = false;
$field['edit'] = false;
$field['view'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'created_at';
$field['label'] = 'Created';
$field['list'] = true;
$field['edit'] = false;
$field['view'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'user.first_name';
$field['label'] = 'From User';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'isGuest';
$field['label'] = 'Guest';
$field['type'] = 'boolean';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

// $field = array();
// $field['name'] = 'other_user.first_name';
// $field['label'] = 'To User';
// $field['list'] = true;
// $field['view'] = true;
// $fieldList[] = $field;

$field = array();
$field['name'] = 'other_user.first_name';
$field['label'] = 'To User';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'amount';
$field['label'] = 'Amount in ($)';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'payment_gateway.name';
$field['label'] = 'Payment Gateway';
$fieldList[] = $field;
$subArray['filter_list'] = array(
	array(
		'name' => 'Filter By',
		'value' => ''
	),
	array(
		'name' => 'Existing',
		'value' => 'existing'
	),
	array(
		'name' => 'Pending',
		'value' => 'pending'
	)	
);
$subArray['listview']['fields'] = $fieldList;

// -------------------------------------- Transactions -----------------------------------------
$fieldList = array();
$subArray = array();
$subArray['title'] = 'Transactions';
$subArray['role_id'] = [1,4];
$subArray['icon_class'] = 'fa fa-users';
$subArray['route'] = '/admin/actions/transactions';
//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['view'] = false;
$field['listActions'] = array();

$action = array();
$action['api'] = '/users/view';
$action['label'] = 'view';
$action['class'] = 'btn crud-approval-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;
$field['list'] = true;
$field['view'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'id';
$field['label'] = 'ID';
$field['list'] = false;
$field['edit'] = false;
$field['view'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'created_at';
$field['label'] = 'Created';
$field['list'] = true;
$field['edit'] = false;
$field['view'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'user.first_name';
$field['label'] = 'From User';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'isGuest';
$field['label'] = 'Guest';
$field['type'] = 'boolean';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

// $field = array();
// $field['name'] = 'other_user.first_name';
// $field['label'] = 'To User';
// $field['list'] = true;
// $field['view'] = true;
// $fieldList[] = $field;

$field = array();
$field['name'] = 'other_user.first_name';
$field['label'] = 'To User';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'amount';
$field['label'] = 'Amount in ($)';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'payment_gateway.name';
$field['label'] = 'Payment Gateway';
$fieldList[] = $field;
$subArray['listview']['fields'] = $fieldList;

// $childMenu = array();
// $childMenu['title'] = 'Product History';
// $childMenu['api'] = '/admin/transactions';
// $childMenu['route'] = '/admin/actions/product_history';
// $childMenu['icon_class'] = 'fa fa-users';
// $childMenu['query'] = 'Product';

// $fieldList = array();
// $field = array();
// $field['name'] = 'detail.product_detail.name';
// $field['label'] = 'Product';
// $fieldList[] = $field;
// $childMenu['listview']['fields'] = $fieldList;
// $subArray['child_sub_menu'][] = $childMenu;

$childMenu = array();
$childMenu['title'] = 'Vote History';
$childMenu['api'] = '/admin/transactions';
$childMenu['route'] = '/admin/actions/vote_history';
$childMenu['icon_class'] = 'fa fa-users';
$childMenu['query'] = 'VotePackage';
$fieldList = array();
$field = array();
$field['name'] = 'package.name';
$field['label'] = 'Package';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;
$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;

// $childMenu = array();
// $childMenu['title'] = 'Instant History';
// $childMenu['api'] = '/admin/transactions';
// $childMenu['route'] = '/admin/actions/instant_history';
// $childMenu['icon_class'] = 'fa fa-users';
// $childMenu['query'] = 'InstantPackage';
// $fieldList = array();
// $field = array();
// $field['name'] = 'package.name';
// $field['label'] = 'Package';
// $field['list'] = true;
// $field['view'] = true;
// $fieldList[] = $field;
// $childMenu['listview']['fields'] = $fieldList;
// $subArray['child_sub_menu'][] = $childMenu;

// $childMenu = array();
// $childMenu['title'] = 'Subscription History';
// $childMenu['api'] = '/admin/transactions';
// $childMenu['route'] = '/admin/actions/subscription_history';
// $childMenu['icon_class'] = 'fa fa-users';
// $childMenu['query'] = 'SubscriptionPackage';
// $fieldList = array();
// $field = array();
// $field['name'] = 'subscription.description';
// $field['label'] = 'Package';
// $field['list'] = true;
// $field['view'] = true;
// $fieldList[] = $field;
// $childMenu['listview']['fields'] = $fieldList;
// $subArray['child_sub_menu'][] = $childMenu;

$childMenu = array();
$childMenu['title'] = 'Fund History';
$childMenu['role_id'] = [1];
$childMenu['api'] = '/admin/transactions';
$childMenu['route'] = '/admin/actions/fund_history';
$childMenu['icon_class'] = 'fa fa-users';
$childMenu['query'] = 'Fund';
$childMenu['listview']['fields'] = array();
$subArray['child_sub_menu'][] = $childMenu;
$menus[] = $subArray;

// -------------------------------------------- Events ---------------------------------------------
$fieldList = array();
$subArray = array();
$subArray['title'] = 'Events';
$subArray['icon_class'] = 'fa fa-calendar';
$fieldList = array();

$field = array();
$field['name'] = 'id';
$field['label'] = 'Id';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'name';
$field['label'] = 'Name';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = true;
$field['edit'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'start_date';
$field['label'] = 'Start Date';
$field['type'] = 'date';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = true;
$field['edit'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'end_date';
$field['label'] = 'End Date';
$field['type'] = 'date';
$field['is_required'] = true;
$field['list'] = true;
$field['edit'] = true;
$field['add'] = true;
$field['view'] = true;
$fieldList[] = $field;

//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/contests/edit';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;

$action = array();
$action['api'] = '/contests/view';
$action['label'] = 'view';
$action['class'] = 'btn crud-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$childMenu = array();
$childMenu['title'] = 'Contests';
$childMenu['api'] = '/admin/contests';
$childMenu['role_id'] = [1];
$childMenu['route'] = '/admin/actions/contests';
$childMenu['add']['url'] = '/admin/instants/add';
$childMenu['icon_class'] = 'fa fa-users';
$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;

// $childMenu = array();
// $childMenu['title'] = 'Instant Contest';
// $childMenu['api'] = '/admin/instants';
// $childMenu['route'] = '/admin/actions/instants';
// $childMenu['icon_class'] = 'fa fa-users';
// $childMenu['add']['url'] = '/admin/instants/add';
// $subArray['child_sub_menu'][] = $childMenu;

$childMenu = array();
$childMenu['title'] = 'Contest Contestants';
$childMenu['api'] = '/admin/contest_contestants';
$childMenu['role_id'] = [1];
$childMenu['route'] = '/admin/actions/contest_contestants';
$childMenu['add']['url'] = '/admin/instants/add';
$childMenu['icon_class'] = 'fa fa-users';
$fieldList = array();

$field = array();
$field['name'] = 'contest';
$field['option_name'] = 'name';
$field['label'] = 'Contest Name';
$field['reference'] = '/contest';
$field['query'] = 'instants';
$field['type'] = 'select';
$field['is_required'] = true;
$field['list'] = false;
$field['add'] = true;
$field['edit'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'contest.name';
$field['label'] = 'Contest Name';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = false;
$field['edit'] = false;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'contest.start_date';
$field['label'] = 'Start Date';
$field['type'] = 'date';
$field['is_required'] = true;
$field['list'] = true;
$field['view'] = true;
$field['edit'] = false;
$fieldList[] = $field;

$field = array();

$field['name'] = 'contest.end_date';
$field['label'] = 'End Date';
$field['type'] = 'date';
$field['is_required'] = true;
$field['list'] = true;
$field['edit'] = false;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'user';
$field['option_name'] = 'fullname';
$field['label'] = 'Contestant';
$field['type'] = 'select';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = true;
$field['query'] = 'instants';
$field['reference'] = '/contestant_user';
$field['list'] = false;
$field['edit'] = true;
$field['view'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'user.first_name';
$field['label'] = 'First Name';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = false;
$field['list'] = true;
$field['edit'] = false;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'user.last_name';
$field['label'] = 'Last Name';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = false;
$field['list'] = true;
$field['edit'] = false;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

$field = array();
$field['name'] = 'user.votes';
$field['label'] = 'Votes';
$field['type'] = 'text';
$field['placeholder'] = 'Enter here....';
$field['is_required'] = true;
$field['add'] = false;
$field['list'] = true;
$field['edit'] = false;
$field['view'] = true;
$field['value'] = '';
$fieldList[] = $field;

//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/contests/edit';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;

$action = array();
$action['label'] = 'view';
$action['class'] = 'btn crud-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;
$fieldList[] = $field;

$action = array();
$action['label'] = 'Delete';
$action['class'] = 'btn crud-action btn-danger';
$action['icon'] = 'fa fa-trash';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;
$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;
$menus[] = $subArray;

// --------------------------------------- Master -----------------------------------------
$fieldList = array();
$subArray = array();
$subArray['title'] = 'Master';
$subArray['role_id'] = [1];
$subArray['icon_class'] = 'fa fa-book';
$subArray['listview']['fields'] = array();

$childMenu = array();
$childMenu['title'] = 'Sponsors';
$childMenu['api'] = '/admin/sponsors';
$childMenu['route'] = '/admin/actions/sponsors';
$childMenu['icon_class'] = 'fa fa-users';
$childMenu['add']['url'] = '/admin/sponsors/add';

$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['label'] = 'View';
$action['class'] = 'btn crud-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;
$action = array();
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;
$action = array();
$action['label'] = 'Delete';
$action['class'] = 'btn crud-action btn-danger';
$action['icon'] = 'fa fa-trash';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'id';
$field['label'] = 'Id';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = false;
$field['edit'] = false;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'name';
$field['label'] = 'Name';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = true;
$field['edit'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'image';
$field['label'] = 'Image';
$field['type'] = 'file';
$field['is_required'] = true;
$field['list'] = false;
$field['add'] = true;
$field['edit'] = true;
$field['view'] = true;
$fieldList[] = $field;

$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;

// $childMenu = array();
// $childMenu['title'] = 'Sizes';
// $childMenu['api'] = '/admin/sizes';
// $childMenu['route'] = '/admin/actions/sizes';
// $childMenu['icon_class'] = 'fa fa-users';
// $childMenu['add']['url'] = '/admin/sizes/add';
//actions
// $field = array();
// $field['name'] = 'actions';
// $field['label'] = 'Actions';
// $field['listActions'] = array();

// $action = array();
// $action['api'] = '/admin/sizes';
// $action['label'] = 'Edit';
// $action['class'] = 'btn crud-action btn-primary';
// $action['icon'] = 'fa fa-pencil';
// $field['listActions'][] = $action;
// $action = array();
// $action['api'] = '/admin/sizes';
// $action['label'] = 'Delete';
// $action['class'] = 'btn crud-action btn-danger';
// $action['icon'] = 'fa fa-trash';
// $field['listActions'][] = $action;
// $field['list'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'name';
// $field['label'] = 'Name';
// $field['type'] = 'text';
// $field['is_required'] = true;
// $field['list'] = true;
// $field['add'] = true;
// $field['edit'] = true;
// $fieldList[] = $field;

// $childMenu['listview']['fields'] = $fieldList;
// $subArray['child_sub_menu'][] = $childMenu;

$childMenu = array();
$childMenu['title'] = 'Categories';
$childMenu['role_id'] = [1];
$childMenu['api'] = '/admin/categories';
$childMenu['route'] = '/admin/actions/categories';
$childMenu['icon_class'] = 'fa fa-users';
$childMenu['add']['url'] = '/admin/categories/add';
//actions
$fieldList = array();
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;

$action = array();
$action['label'] = 'Delete';
$action['class'] = 'btn crud-action btn-danger';
$action['icon'] = 'fa fa-trash';
$field['listActions'][] = $action;

$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'name';
$field['label'] = 'Name';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = true;
$field['edit'] = true;
$fieldList[] = $field;

$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;
$fieldList = array();
$childMenu = array();
$childMenu['title'] = 'Vote Packages';
$childMenu['role_id'] = [1];
$childMenu['api'] = '/admin/vote_packages';
$childMenu['route'] = '/admin/actions/vote_packages';
$childMenu['icon_class'] = 'fa fa-users';
$childMenu['add']['url'] = '/admin/vote_packages/add';
//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/admin/vote_packages';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;
$action = array();
$action['api'] = '/admin/vote_packages';
$action['label'] = 'Delete';
$action['class'] = 'btn crud-action btn-danger';
$action['icon'] = 'fa fa-trash';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'name';
$field['label'] = 'Name';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = true;
$field['edit'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'price';
$field['label'] = 'Price';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = true;
$field['edit'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'vote';
$field['label'] = 'Votes';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['add'] = true;
$field['edit'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'description';
$field['label'] = 'Description';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = false;
$field['add'] = true;
$field['edit'] = true;
$fieldList[] = $field;


$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;
$fieldList = array();
// $childMenu = array();
// $childMenu['title'] = 'Subscriptions';
// $childMenu['api'] = '/admin/subscriptions';
// $childMenu['route'] = '/admin/actions/subscriptions';
// $childMenu['icon_class'] = 'fa fa-users';
// $childMenu['add']['url'] = '/admin/subscriptions/add';
//actions
// $field = array();
// $field['name'] = 'actions';
// $field['label'] = 'Actions';
// $field['listActions'] = array();

// $action = array();
// $action['api'] = '/admin/subscriptions';
// $action['label'] = 'Edit';
// $action['class'] = 'btn crud-action btn-primary';
// $action['icon'] = 'fa fa-pencil';
// $field['listActions'][] = $action;
// $field['list'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'price';
// $field['label'] = 'Price';
// $field['type'] = 'text';
// $field['is_required'] = true;
// $field['edit'] = true;
// $field['list'] = true;
// $field['view'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'days';
// $field['label'] = 'Days';
// $field['type'] = 'text';
// $field['is_required'] = true;
// $field['edit'] = true;
// $field['list'] = true;
// $field['view'] = true;
// $fieldList[] = $field;

// $field = array();
// $field['name'] = 'description';
// $field['label'] = 'Description';
// $field['type'] = 'text';
// $field['is_required'] = true;
// $field['edit'] = true;
// $field['list'] = false;
// $field['view'] = true;
// $fieldList[] = $field;

// $childMenu['listview']['fields'] = $fieldList;
//$subArray['child_sub_menu'][] = $childMenu;
$fieldList = array();
$childMenu = array();
$childMenu['title'] = 'Email Templates';
$childMenu['role_id'] = [1];
$childMenu['api'] = '/admin/email_templates';
$childMenu['route'] = '/admin/actions/email_templates';
$childMenu['icon_class'] = 'fa fa-users';
//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/admin/email_templates';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'display_name';
$field['label'] = 'Name';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['edit'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'subject';
$field['label'] = 'Subject';
$field['type'] = 'text';
$field['is_required'] = true;
$field['edit'] = true;
$field['list'] = false;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'description';
$field['label'] = 'Description';
$field['type'] = 'text';
$field['is_required'] = true;
$field['edit'] = true;
$field['list'] = false;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'html_email_content';
$field['label'] = 'Content';
$field['type'] = 'smart_editor';
$field['is_required'] = true;
$field['edit'] = true;
$field['list'] = false;
$field['view'] = false;
$fieldList[] = $field;

$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;
$fieldList = array();
$childMenu = array();
$childMenu['title'] = 'Static Content';
$childMenu['role_id'] = [1];
$childMenu['api'] = '/admin/static_content';
$childMenu['route'] = '/admin/actions/static_content';
$childMenu['icon_class'] = 'fa fa-users';
//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/admin/static_content';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['list'] = true;
$field['edit'] = false;
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'title';
$field['label'] = 'Title';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = true;
$field['edit'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'dispaly_url';
$field['label'] = 'Url';
$field['type'] = 'text';
$field['is_required'] = true;
$field['list'] = false;
$field['edit'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'content';
$field['label'] = 'Content';
$field['type'] = 'smart_editor';
$field['is_required'] = true;
$field['list'] = false;
$field['edit'] = true;
$fieldList[] = $field;

$childMenu['listview']['fields'] = $fieldList;
$subArray['child_sub_menu'][] = $childMenu;
$menus[] = $subArray;
      
// ---------------------------------------------- Payments -----------------------------------------
$fieldList = array();
$subArray = array();
$subArray['title'] = 'Payment Gateways';
$subArray['role_id'] = [1];
$subArray['icon_class'] = 'fa fa-paypal';
$subArray['api'] = '/admin/payment_gateways';
$subArray['route'] = '/admin/actions/payment_gateways';
//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/admin/pages';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'name';
$field['label'] = 'Name';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$subArray['listview']['fields'] = $fieldList;
$menus[] = $subArray;

// --------------------------------------- Contact Us ----------------------------------
$fieldList = array();
$subArray = array();
$subArray['title'] = 'ContactUs';
$subArray['role_id'] = [1];
$subArray['route'] = '/admin/actions/contactus';
$subArray['api'] = '/admin/contactus';
$subArray['query'] = 'contacts';
$subArray['icon_class'] = 'fa fa-envelope';

//actions
$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['label'] = 'View';
$action['class'] = 'btn crud-action btn-info';
$action['icon'] = 'fa fa-eye';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'id';
$field['label'] = 'ID';
$field['list'] = true;
$field['view'] = false;
$fieldList[] = $field;

$field = array();
$field['name'] = 'name';
$field['label'] = 'Name';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'email';
$field['label'] = 'Email';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'subject';
$field['label'] = 'Subject';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'phone';
$field['label'] = 'Phone';
$field['list'] = false;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'message';
$field['label'] = 'Message';
$field['list'] = false;
$field['view'] = true;
$fieldList[] = $field;

$subArray['listview']['fields'] = $fieldList;

//$filter = array();
//$filter['name'] = 'q';
//$filter['label'] = 'Search';
//$subArray['filters'][] = $filter;
$menus[] = $subArray;

// --------------------------------------------------- Settings --------------------------------------------
$fieldList = array();
$subArray = array();
$subArray['title'] = 'Settings';
$subArray['role_id'] = [1];
$subArray['api'] = '/admin/settings';
$subArray['route'] = '/admin/actions/settings';
$subArray['icon_class'] = 'fa fa-cogs';

$field = array();
$field['name'] = 'actions';
$field['label'] = 'Actions';
$field['listActions'] = array();

$action = array();
$action['api'] = '/admin/settings';
$action['label'] = 'Edit';
$action['class'] = 'btn crud-action btn-primary';
$action['icon'] = 'fa fa-pencil';
$field['listActions'][] = $action;
$field['list'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'name';
$field['label'] = 'Name';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$field = array();
$field['name'] = 'description';
$field['label'] = 'Description';
$field['list'] = true;
$field['view'] = true;
$fieldList[] = $field;

$subArray['listview']['fields'] = $fieldList;
$menus[] = $subArray;

$subArray = array();
$subArray['title'] = 'Profile';
$subArray['role_id'] = [4,3];
$subArray['api'] = '/users/change_password';
$subArray['route'] = '/edit';
$subArray['icon_class'] = 'fa fa-fw fa-dashboard';
$menus[] = $subArray;

$subArray = array();
$subArray['title'] = 'Change Password';
$subArray['role_id'] = [1,4,3];
$subArray['api'] = '/users/change_password';
$subArray['route'] = '/admin/change_password';
$subArray['icon_class'] = 'fa fa-fw fa-dashboard';
$menus[] = $subArray;

// ------------------------------------- Logout ----------------------------------
$subArray = array();
$subArray['title'] = 'Logout';
$subArray['role_id'] = [1,4,3];
$subArray['api'] = '/logout';
$subArray['route'] = '/admin/actions/logout';
$subArray['icon_class'] = 'fa fa-users';
$menus[] = $subArray;