class MachineData{
  /**
   * @type {number[]}
  */
 jobs;
 /**
  * @type {number}
 */
 load;
/**
 * @constructor
 * @param {number} load 
 * @param {number[]} jobs 
 */
  constructor(load,jobs){
    this.load = load;
    this.jobs = jobs;
  }
};
class Machine{
  /**
   * Total load assigned to the machine.
   * @type {number}
   * @private
   */
  #totalLoad = 0;
  /**
   * Array containing loads assigned to individual jobs.
   * 
   * @type {number[]}
   * @private
   */
  #jobLoads = [];
  /**
   * @constructor
   */
  constructor(){
    /**
     * @type {number[]}
     */
    this.#jobLoads = [];
    /**
     * @type {number}
     */
    this.#totalLoad = 0
  }
  /**
   * returns load of machine
   * @name getLoad
   * @param {void}
   * @returns {number}
   */
  getLoad(){
    return this.#totalLoad;
  }
  /**
   * Assigns a job with a given load to the machine.
   * @name assignJobs
   * @param {number} jobLoad - The load of the job to be assigned.
   * @returns {void}
   */
  assignJobs(jobLoad){
    this.#jobLoads.push(jobLoad);
    this.#totalLoad+=jobLoad;
  }
  /**
   * Retrieves the loads assigned to individual jobs.
   * 
   * @name getJobs
   * @returns {number[]} An array containing loads assigned to individual jobs.
   */
  getJobs(){
    return this.#jobLoads;
  }
  /**
   * clears load
   * 
   */
  clear(){
    this.#jobLoads = []
    this.#totalLoad = 0;
  }
  
  /**
   * @param {void}
   * @returns {MachineData}
   */
  getData(){
    return new MachineData(this.#totalLoad,this.#jobLoads);
  }
};
class LoadBalencer{  
  /**
   * @type {string}
   * @private
   */
  #scheduling_used = '';
  /**
   * @private
   * @type {Array<Machine>}
   */
  #machines = [];
  /**
   * @private
   * @type {number[]}
   */
  #jobs = [];
  /**
   *  @param {number} machines
   *  @param {number[]} jobs
   */
  constructor(machines,jobs){
    while(machines){
      this.#machines.push(new Machine())
      machines--;
    }
    this.#jobs = jobs;
  }
  /**
   * @returns {LoadBalencer}
   */
  applyGreedyScheduling(){
    this.#scheduling_used = 'greedyScheduling';
    this.#jobs.forEach((item)=>{
      this.getShortestMakeSpan().assignJobs(item);
    });
    return this;
  }
  /**
   * resets all machine
   * @returns {void}
   */
  resetMachines(){
    this.#machines.forEach(item=>{
      item.clear();
    });
  }
  /**
   *@param {number} epsilon
   *@returns {LoadBalencer}
   */
  apply_PTAS_Scheduling(epsilon){
    let totalTime = this.#jobs.reduce((acc,cur)=>(acc+cur),0);
    /**
     * @type {number[]}
     */
    let arr_large = []
    /**
     * @type {number[]}
     */
    let arr_small = [];
    this.#jobs.forEach(item=>{
      if(item>totalTime*epsilon)
        arr_large.push(item);
      else
        arr_small.push(item);
    });
    arr_large.forEach((item,index)=>{
      this.#machines[index%this.#machines.length].assignJobs(item);
    });
    let jobs= this.#jobs;
    this.#jobs = arr_small;
    this.applyGreedyScheduling()
    this.#jobs = jobs;
    this.#scheduling_used = 'PTAS_Scheduling';
    return this;
  }
   /**
   * @returns {LoadBalencer}
   */
  applyOrderedScheduling(){
    this.#scheduling_used = 'orderedScheduling';
    let job_list = [...this.#jobs]
    job_list.sort((a,b)=>(b-a)).forEach((item)=>{
      this.getShortestMakeSpan().assignJobs(item);
    });
    return this;
  }
  /**
   * @name getShortestMakeSpan
   * @returns {Machine}
   */
  getShortestMakeSpan(){
    this.#machines.sort((a,b)=>(a.getLoad() - b.getLoad()));
    return this.#machines[0];
  }
  getMakeSpan(){
    this.#machines.sort((a,b)=>(a.getLoad() - b.getLoad()))
    return this.#machines[this.#machines.length-1].getLoad();
  }
  /**
   * @name getData
   * @param {void}
   * @returns {LoadBalenceReport}
   */
  getData=()=>(new LoadBalenceReport(this.#machines.map(item=>(item.getData())),this.getMakeSpan(),this.#scheduling_used));
  /**
   * adds new machine
   * @param {void}
   */
  addNewMachine(){
    this.#machines.push(new Machine());
  }
  /**
   * @param {number[]} jobLoad
   */
  addNewJobs(...jobLoad){
    this.#jobs = [...this.#jobs,...jobLoad];
  }
};
class LoadBalenceReport{
  /**
   * @type {MachineData[]}
   */
  machines;
  /**
   * @type {number}
   */
  makeSpan;
  /**
   * @type {string}
   */
  methodUsed;
  /**
   * @constructor
   * @param {MachineData[]} machines 
   * @param {number} makeSpan 
   * @param {string} methodUsed 
   */
  constructor(machines,makeSpan,methodUsed){
    this.machines = machines;
    this.makeSpan = makeSpan;
    this.methodUsed = methodUsed;
  }
};
export default {Machine,LoadBalencer,MachineData,LoadBalenceReport};