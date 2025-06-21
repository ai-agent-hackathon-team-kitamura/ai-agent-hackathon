from google.cloud import firestore

def get_firestore_client():
    return firestore.Client()

def get_health(uid: str):
    db = get_firestore_client()
    doc_ref = db.collection("UserEngagementSurvey").document(uid)
    doc = doc_ref.get()

    if doc.exists:
        data = doc.to_dict()
        engagement_map = data.get("engagementMap", {})
        health = engagement_map.get("health")
        return health
    else:
        return None  # 該当uidなし

def upsert_user_engagement_survey(uid: str, engagement_map: dict):
    db = get_firestore_client()
    doc_ref = db.collection("UserEngagementSurvey").document(uid)

    # ドキュメントの存在確認
    if doc_ref.get().exists:    
        doc_ref.update({
            "engagementMap": firestore.ArrayUnion([engagement_map])
        })
    else:
        # 新規作成
        doc_ref.set({
            "uid": uid,
            "engagementMap": [engagement_map]
        })

