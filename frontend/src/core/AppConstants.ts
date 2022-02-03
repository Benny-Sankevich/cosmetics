export namespace AppConstants {
  export class Routes {
    public static Login = 'Login';
    public static LockScreen = 'LockScreen';
    public static HomePage = 'HomePage';
    public static UsersPage = 'UsersPage';
    public static CustomerPage = 'CustomerPage';
    public static ProfileSettings = 'ProfileSettings';
    public static Treatments = 'Treatments';
    public static TreatmentsList = 'TreatmentsList';
    public static Users = 'Users';
    public static UsersList = 'UsersList';
    public static Calendar = 'Calendar';
    public static Appointments = 'Appointments';
    public static AppointmentsList = 'AppointmentsList';
    public static Purchase = 'Purchase';
    public static PurchaseList = 'PurchaseList';
    public static PurchaseDetails = 'PurchaseDetails';
    public static SuppliersList = 'SuppliersList';
    public static AboutPage = 'AboutPage';
    public static Reports = 'Reports';
    public static GeneralReports = 'GeneralReports';
    public static ReportGenerator = 'ReportGenerator';
    public static ReportTable = 'ReportTable';
    public static AvailableAppointmentsPage = 'AvailableAppointmentsPage';
    public static SettingsPage = 'SettingsPage';
  }

  // Modules
  export const UiModule = 'ui';
  export const TreatmentModule = 'treatments';
  export const AuthModule = 'auth';
  export const PurchaseModule = 'purchase';
  export const AppointmentModule = 'appointment';
  export const UsersModule = 'users';
  export const ReportModule = 'reports';

  export class Ui {
    public static GetIsFormDirty = 'getIsFormDirty';
    public static GetPendingRequestsCount = 'getPendingRequestsCount';
    public static GetAllTranslations = 'getAllTranslations';
    public static GetRouteParamId = 'getRouteParamId';
    public static GetUserLangCode = 'getUserLangCode';
    public static ActionLoadTranslations = 'loadTranslations';
    public static MutationSetIsFormDirty = 'setIsFormDirty';
    public static MutationAddPendingRequest = 'addPendingRequest';
    public static MutationRemovePendingRequest = 'removePendingRequest';
    public static MutationSetTranslations = 'setTranslations';
    public static MutationSetRouteParamId = 'setRouteParamId';
    public static MutationSetUserLangCode = 'setUserLangCode';
  }

  export class Treatments {
    public static GetTreatments = 'getTreatments';
    public static ActionLoadTreatments = 'loadTreatments';
    public static ActionSaveTreatment = 'saveTreatment';
    public static ActionEditTreatment = 'editTreatment';
    public static ActionDeleteTreatment = 'deleteTreatment';
    public static MutationSetTreatments = 'setTreatments';
    public static MutationSaveTreatment = 'saveTreatment';
    public static MutationUpdateTreatment = 'updateTreatment';
    public static MutationDeleteTreatment = 'deleteTreatment';
  }

  export class Auth {
    public static GetAuthUser = 'getAuthUser';
    public static GetSystemRole = 'getSystemRole';
    public static ActionAuthLoggedIn = 'authLoggedIn';
    public static ActionAuthRegistered = 'authRegistered';
    public static ActionAuthLoggedOut = 'authLoggedOut';
    public static ActionEditUserProfile = 'actionEditUserProfile';
    public static MutationAuthLoggedIn = 'saveUserAuth';
    public static MutationAuthRemove = 'removeUserAuth';
    public static MutationEditUserProfile = 'mutationEditUserProfile';
    public static MutationSetSystemRole = 'mutationSetSystemRole';
  }

  export class Users {
    public static GetUsers = 'getUsers';
    public static ActionLoadUsers = 'loadUsers';
    public static ActionSaveUser = 'saveUser';
    public static ActionEditUser = 'editUser';
    public static MutationSetUsers = 'setUsers';
    public static MutationSaveUser = 'saveUser';
    public static MutationUpdateUser = 'updateUser';
  }

  export class Appointment {
    public static GetAppointments = 'getAppointments';
    public static GetAwaitingAppointments = 'getAwaitingAppointments';
    public static ActionLoadAppointments = 'loadAppointments';
    public static ActionSaveAppointment = 'saveAppointment';
    public static ActionEditAppointment = 'editAppointment';
    public static ActionDeleteAppointment = 'deleteAppointment';
    public static ActionLoadAwaitingAppointments = 'loadAwaitingAppointments';
    public static ActionApproveAwaitingAppointments =
      'approveAwaitingAppointments';
    public static MutationSetAppointments = 'setAppointments';
    public static MutationSaveAppointment = 'saveAppointment';
    public static MutationUpdateAppointment = 'updateAppointment';
    public static MutationDeleteAppointment = 'deleteAppointment';
    public static MutationSetAwaitingAppointments = 'setAwaitingAppointments';
    public static MutationRemoveAwaitingAppointments =
      'removeAwaitingAppointments';
  }

  export class Supplier {
    public static GetAllSuppliers = 'getAllSuppliers';
    public static ActionLoadAllSuppliers = 'loadAllSuppliers';
    public static ActionSaveSupplier = 'saveSupplier';
    public static ActionEditSupplier = 'editSupplier';
    public static ActionDeleteSupplier = 'deleteSupplier';
    public static MutationSetSuppliers = 'setSuppliers';
    public static MutationSaveSupplier = 'saveSupplier';
    public static MutationUpdateSupplier = 'updateSupplier';
    public static MutationDeleteSupplier = 'deleteSupplier';
  }

  export class Purchase {
    public static GetAllPurchaseOrders = 'getAllPurchaseOrders';
    public static GetPurchaseOrderToEdit = 'getPurchaseOrderToEdit';
    public static ActionLoadAllPurchaseOrders = 'loadAllPurchaseOrders';
    public static ActionSavePurchaseOrder = 'savePurchaseOrder';
    public static ActionEditPurchaseOrder = 'editPurchaseOrder';
    public static ActionDeletePurchaseOrder = 'deletePurchaseOrder';
    public static MutationSetPurchaseOrders = 'setPurchaseOrder';
    public static MutationSavePurchaseOrder = 'savePurchaseOrder';
    public static MutationUpdatePurchaseOrder = 'updatePurchaseOrder';
    public static MutationDeletePurchaseOrder = 'deletePurchaseOrder';
    public static MutationSetPurchaseOrderToEdit =
      'mutationSetPurchaseOrderToEdit';
  }

  export class Report {
    public static GetReportProperties = 'getReportProperties';
    public static MutationSetReportProperties = 'mutationSetReportProperties';
  }
}
