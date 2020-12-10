import React from 'react'
import { Accordion, Card } from 'react-bootstrap'

const ListPart = () => {
    return (
        <Card>
            {/* <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#activityBased" aria-expanded="true" aria-controls="activityBased">
                        Activity Based Playlists
                    </button>
                </h5>
            </div>
            <div id="activityBased" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <ul class="card-body album-container">
                </ul>
            </div> */}
            <Accordion.Toggle as={Card.Header} eventKey="0">
                TAB 1
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
                <Card.Body>This is first tab body</Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default ListPart