import React from 'react';


const Summarycard = (props) => {
    return (
        <div>
             <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3">
              <div class="col">
                <div class="card radius-10 border-start border-0 border-3 border-info">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <h3 class="mb-0 text-dark"> <b>Total Employee</b></h3>
                        <h3 class="my-1 text-info">{props.employeenumb}</h3>
                       
                      </div>
                      <div class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                      <i class="fa fa-users"></i>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card radius-10 border-start border-0 border-3  border-danger">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <h3 class="mb-0 text-dark">
                          <b>Employee Present Today</b>
                        </h3>
                        <h3 class="my-1 text-danger">{props.presentemployee}/{props.employeenumb}</h3>
                        {/* <p class="mb-0 font-13">{props.presentpercent}% </p> */}
                      </div>
                      <div class="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                        {/* <i class="fa fa-dollar"></i> */}
                        <i class="fa fa-users"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card radius-10 border-start border-0 border-3 border-success">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <h3 class="mb-0 text-dark"><b>Employee Absent Today</b></h3>
                        <h3 class="my-1 text-success">{props.absentemployee}/{props.employeenumb}</h3>
                      
                      </div>
                      <div class="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                        <i class="fa fa-bar-chart"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
        </div>
    );
}

export default Summarycard;
