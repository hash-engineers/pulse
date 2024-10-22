export enum EWhenToAlert {
  URL_BECOMES_UNAVAILABLE = 'URL_BECOMES_UNAVAILABLE',
  URL_DOES_NOT_CONTAIN_KEYWORD = 'URL_DOES_NOT_CONTAIN_KEYWORD',
  URL_CONTAINS_A_KEYWORD = 'URL_CONTAINS_A_KEYWORD',
  URL_RETURNS_HTTP_STATUS_OTHER_THAN = 'URL_RETURNS_HTTP_STATUS_OTHER_THAN',
  HOST_DOES_NOT_RESPOND_TO_PING = 'HOST_DOES_NOT_RESPOND_TO_PING',
}

export enum ENextAction {
  DO_NOTHING = 'DO_NOTHING',
  IMMEDIATELY_ALERT_ALL_OTHER_TEAM_MEMBER = 'IMMEDIATELY_ALERT_ALL_OTHER_TEAM_MEMBER',
  WITHIN_3_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS = 'WITHIN_3_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS',
  WITHIN_5_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS = 'WITHIN_5_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS',
  WITHIN_10_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS = 'WITHIN_10_MINUTES_ALERT_ALL_OTHER_TEAM_MEMBERS',
}

export enum EMonitorStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  PAUSED = 'PAUSED',
  PENDING = 'PENDING',
}
