from app.models.complaint_enums import ComplaintStatus


ALLOWED_TRANSITIONS = {
    ComplaintStatus.OPEN: [
        ComplaintStatus.IN_PROGRESS,
    ],

    ComplaintStatus.IN_PROGRESS: [
        ComplaintStatus.UNDER_REVIEW,
    ],

    ComplaintStatus.UNDER_REVIEW: [
        ComplaintStatus.RESOLVED,
    ],

    ComplaintStatus.RESOLVED: [
        ComplaintStatus.CLOSED,
    ],

    ComplaintStatus.CLOSED: [],
}


def is_valid_transition(
    current_status: ComplaintStatus,
    new_status: ComplaintStatus,
) -> bool:

    return new_status in ALLOWED_TRANSITIONS.get(
        current_status,
        [],
    )
