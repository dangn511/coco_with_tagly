<template>
  <div @mousemove="mouseMove">
    <div style="padding-top: 55px" />

    <!-- <div class="bg-light" :style="{ 'margin-left': sidebar.width + 'px' }"> -->
    <div class="bg-light">
      <nav class="nav border-bottom shadow-sm" style="background-color: #4b5162">
        <div class="px-2" style="float: right">

          <a class="btn tab" @click="tab = 'batchtag'" :style="{ color: tab == 'batchtag' ? 'white' : 'darkgray' }">
            <i class="fa fa-list" aria-hidden="true"></i> Batch tagging
          </a>
          <a class="btn tab" @click="tab = 'images'" :style="{ color: tab == 'images' ? 'white' : 'darkgray' }">
            <i class="fa fa-picture-o" aria-hidden="true"></i> Object Annotation
          </a>
          <a class="btn tab" @click="tab = 'exports'" :style="{ color: tab == 'exports' ? 'white' : 'darkgray' }">
            <i class="fa fa-share" aria-hidden="true"></i> Exports
          </a>
          <a class="btn tab" @click="tab = 'analytics'" :style="{ color: tab == 'analytics' ? 'white' : 'darkgray' }">
            <i class="fa fa-users" aria-hidden="true"></i> Analytics
          </a>
          <a class="btn tab" @click="tab = 'searchbar'" :style="{ color: tab == 'searchbar' ? 'white' : 'darkgray' }">
            <i class="fa fa-users" aria-hidden="true"></i> Search
          </a>

          <!-- <a class="btn tab" @click="tab = 'members'" :style="{ color: tab == 'members' ? 'white' : 'darkgray' }">
          <i class="fa fa-users" aria-hidden="true"></i> Members
        </a>
        <a class="btn tab" @click="tab = 'statistics'" :style="{ color: tab == 'statistics' ? 'white' : 'darkgray' }">
          <i class="fa fa-bar-chart" aria-hidden="true"></i> Statistics
        </a>
        <a class="btn tab" @click="tab = 'settings'" :style="{ color: tab == 'settings' ? 'white' : 'darkgray' }">
          <i class="fa fa-cog" aria-hidden="true"></i> Settings
        </a>
        <a class="btn tab" @click="tab = 'testdragselect'"
          :style="{ color: tab == 'testdragselect' ? 'white' : 'darkgray' }">
          <i class="fa fa-list" aria-hidden="true"></i> Test dragsel
        </a> -->
        </div>
      </nav>

      <div class="bg-light text-left" style="overflow: auto; height: calc(100vh - 100px); margin: 10px">
        <div class="container" v-show="tab == 'images'">
          <!-- <ol class="breadcrumb">
            <li class="breadcrumb-item"></li>
            <li class="breadcrumb-item active">
              <button class="btn btn-sm btn-link" @click="folders = []">
                {{ dataset.name }}
              </button>
            </li>
            <li v-for="(folder, folderId) in folders" :key="folderId" class="breadcrumb-item">
              <button class="btn btn-sm btn-link" :disabled="folders[folders.length - 1] === folder"
                @click="removeFolder(folder)">
                {{ folder }}
              </button>
            </li>
          </ol> -->

          <p class="text-center" v-if="images.length < 1">
            No images found in directory.
          </p>
          <div v-else>
            <Pagination :pages="pages" @pagechange="updatePage" />
            <div class="row">
              <ImageCard v-for="image in images" :key="image.id" :image="image" />
            </div>
            <Pagination :pages="pages" @pagechange="updatePage" />
          </div>
        </div>

        <!-- <div class="container" v-show="tab == 'testdragselect'">
          <h1>Drag select test</h1>

          <div>
            <MyDragSel attribute="attr" @change="selectedCards = $event">
              <div v-for="item in [1, 2, 3]" :key="item" :attr="item"
                class="w-20 h-20 bg-white shadow-md rounded m-2 flex justify-center items-center text-lg text-gray-700"
                :class="{ 'border border-primary': selectedCards.includes(String(item)) }">
                {{ item }}
              </div>
            </MyDragSel>
          </div> -->

        <!-- <div class="flex mt-3">
            <div class="mr-2">Selected items:</div>
            <div class="mr-2" v-for="item in selectedCards" :key="item">
              {{ item }}
            </div>

          </div> -->


        <!-- <div>
            <MyDragSel attribute="attr" @change="selectedImages = $event"></MyDragSel>
            <MyDragSel attribute="attr" @change="selectChange($event)">
              <ImageCardBatch v-for="image in images" :key="image.id" :attr="image.id" :image="image"
                :class="{ 'shadow-outline': selectedImages.includes(String(image.id)) }" />
            </MyDragSel>
          </div>

          <div class="flex mt-3">
            <div class="mr-2">Selected items:</div>
            <div class="mr-2" v-for="item in selectedImages" :key="item">
              {{ item }}
            </div>

          </div> -->

        <!-- <div>

            <MyDragSel attribute="attr">
              <template v-slot="{ selected }">
                <div v-for="item in [1, 2, 3]" :key="item" :attr="item" class="w-20 h-20"
                  :class="{ 'shadow-outline': selected.includes(String(item)) }">{{ item }}</div>
              </template>
            </MyDragSel>

          </div>> -->
        <!-- <drag-select-container selectorClass="item">
            <template slot-scope="{ selectedItems }">
              <div v-for="item in 50" :key="item" :class="getClasses(item, selectedItems)" :data-item="item">Item {{
                item
              }}</div>
            </template>
          </drag-select-container> -->
        <!-- </div> -->

        <!-- this one is for displaying tagly style -->

        <div class="container" v-show="tab == 'batchtag'">
          <!-- <ol class="breadcrumb">
            <li class="breadcrumb-item"></li>
            <li class="breadcrumb-item active">
              <button class="btn btn-sm btn-link" @click="folders = []">
                {{ dataset.name }}
              </button>
            </li>
            <li v-for="(folder, folderId) in folders" :key="folderId" class="breadcrumb-item">
              <button class="btn btn-sm btn-link" :disabled="folders[folders.length - 1] === folder"
                @click="removeFolder(folder)">
                {{ folder }}
              </button>
            </li>
          </ol> -->


          <!-- <div
            class="sidebar-section"
            :style="{ 'max-height': mode == 'label' ? '100%' : '57%' }"
          >
            <p
              v-if="categories.length == 0"
              style="color: lightgray; font-size: 12px"
            >
              No categories have been enabled for this image.
            </p>

            <div
              v-show="mode == 'segment'"
              style="overflow: auto; max-height: 100%"
            >
              <Category
                v-for="(category, index) in categories"
                :key="category.id + '-category'"
                :simplify="simplify"
                :categorysearch="search"
                :category="category"
                :all-categories="categories"
                :opacity="shapeOpacity"
                :hover="hover"
                :index="index"
                @click="onCategoryClick"
                @keypoints-complete="onKeypointsComplete"
                :current="current"
                :active-tool="activeTool"
                :scale="image.scale"
                ref="category"
              />
            </div>

            <div
              v-show="mode == 'label'"
              style="overflow: auto; max-height: 100%"
            >
              <CLabel
                v-for="category in categories"
                v-model="image.categoryIds"
                :key="category.id + '-label'"
                :category="category"
                :search="search"
              />
            </div>
          </div> -->

          <!-- <p class="text-center" style="color: lightgray">
            All the damn categories
            <strong style="color: black">{{ categories }}</strong> 
          </p> -->

          <!-- categories buttons -->
          <!-- 
          <div
            class="sidebar-section"
            :style="{ 'max-height': mode == 'label' ? '100%' : '57%' }"
          > -->

          <!-- <p class="text-center" style="color: lightgray">
            All the categories
            <strong style="color: black">{{ categories }}</strong>
          </p>

          <p class="text-center" style="color: lightgray">
            the whole response allData
            <strong style="color: black">{{ allData }}</strong>
          </p> -->

          <!-- <div
              v-show="mode == 'segment'"
              style="overflow: auto; max-height: 100%"
            > -->

          <!-- <div
            v-show="mode == 'segment'"
            style="overflow: auto; max-height: 100%"
          >
            <Category
              v-for="(category, index) in categories"
              :key="category.id + '-category'"
              :simplify="simplify"
              :categorysearch="search"
              :category="category"
              :all-categories="categories"
              :opacity="shapeOpacity"
              :hover="hover"
              :index="index"
              @click="onCategoryClick"
              @keypoints-complete="onKeypointsComplete"
              :current="current"
              :active-tool="activeTool"
              :scale="image.scale"
              ref="category"
            />
          </div> -->
          <div class="row justify-content-center">
            <h5>Image level annotation</h5>
          </div>

          <div class="row mx-2">
            <div class="col-3 border-left border-right">
              <!-- Placeholder dropdown -->
              <select v-model="selectedDataset">
                <option v-for="mDataset in allDatasets" :value="mDataset" :key="mDataset.id">{{ mDataset.name }}</option>

              </select>

              <button type="button" class="btn btn-success btn-sm mx-3" @click="redirectDataset">
                Go
              </button>

            </div>

            <div class="col-6 border-left border-right">
              <template v-for="(category, index) in categories">
                <span v-if="category.category_type == 'batch'" :key="index"
                  class="badge badge-pill badge-primary category-badge"
                  :class="{ 'border border-dark border-4': activeBatchCategory == category }"
                  :style="{ 'background-color': category.color }" @click="activeBatchCategory = category">
                  {{ category.name }}
                </span>
              </template>

              <!-- <PanelToggle name="Remove category" v-model="removeBatchCategory" /> -->
              <div class="row justify-content-md-center">
                <template>
                  <input type="checkbox" id="removeCategoryCheckbox" v-model="removeBatchCategory" />
                  <label for="removeCategoryCheckbox"> &nbsp; Remove Category </label>
                </template>
              </div>


              <div class="row justify-content-md-center">
                <button type="button" class="btn btn-success btn-sm mx-1" data-toggle="modal"
                  data-target="#createBatchCategories">
                  Create batch category
                </button>

                <button type="button" class="btn btn-primary btn-sm mx-1" @click="tagsetModal">
                  <div v-if="importing.id != null" class="progress">
                    <div class="progress-bar bg-primary" :style="{ width: `${importing.progress}%` }">
                      Importing
                    </div>
                  </div>
                  <div v-else>Import tagset</div>
                </button>

                <button type="button" class="btn btn-primary btn-sm mx-1" @click="exportTagsetModal">
                  <div>Export tagset</div>
                </button>
              </div>
            </div>

            <div class="col-3 border-left border-right">
              <button type="button" class="btn btn-secondary btn-sm mx-1" @click="createScanTask">
                <div v-if="scan.id != null" class="progress">
                  <div class="progress-bar bg-secondary" :style="{ width: `${scan.progress}%` }">
                    Scanning
                  </div>
                </div>
                <div v-else>Scan</div>
              </button>

              <button type="button" class="btn btn-info btn-sm mx-1" @click="exportModal">
                <div v-if="exporting.id != null" class="progress">
                  <div class="progress-bar bg-dark" :style="{ width: `${exporting.progress}%` }">
                    Exporting
                  </div>
                </div>
                <div v-else>Export COCO</div>
              </button>

              <!-- <button type="button" class="btn btn-info btn-sm" @click="exportModal">

                <div>Export CSV</div>
              </button> -->
            </div>
          </div>

          <!-- <div class="flex mt-3">
            <div class="mr-2">Active category:</div>
            <div class="mr-2">
              {{ activeBatchCategory }}
            </div>

          </div> -->


          <p class="text-center" v-if="images.length < 1">
            No images found in directory.
          </p>

          <!-- <p class="text-center" v-if="images.length >= 1">
            Image level tagging
          </p> -->

          <div v-else>
            <div class="row justify-content-md-center my-2">
              <Pagination :pages="pages" @pagechange="updatePage" />
            </div>



            <!-- <div class="row"> -->
            <div>
              <MyDragSel attribute="attr" @change="selectChange($event)" @rightclicked="showZoomModal($event)"
                @contextmenu.native.prevent class="d-flex flex-wrap">
                <ImageCardBatch v-for="image in images" :key="image.id" :attr="image.id" :image="image"
                  :class="{ 'border border-primary': selectedImages.includes(String(image.id)) }" />
              </MyDragSel>
            </div>

            <!-- <div class="flex mt-3">
              <div class="mr-2">Selected items:</div>
              <div class="mr-2" v-for="item in selectedImages" :key="item">
                {{ item }}
              </div>

            </div> -->

            <!-- <div class="row">
              <ImageCardBatch v-for="image in images" :key="image.id" :image="image" />
            </div>
            <Pagination :pages="pages" @pagechange="updatePage" /> -->

          </div>
        </div>

        <div class="container" v-show="tab == 'exports'">
          <div class="card my-3 p-3 shadow-sm mr-2">
            <h6 class="border-bottom border-gray pb-2"><b>Exports</b></h6>

            <div class="media text-muted pt-3" v-for="exp in datasetExports">
              <div class="media-body lh-125 border-bottom border-gray">
                {{ exp.id }}. Exported
                {{ exp.ago.length > 0 ? exp.ago : 0 + " seconds" }} ago
                <div style="display: inline">
                  <span v-for="tag in exp.tags" class="badge badge-secondary" style="margin: 1px">
                    {{ tag }}
                  </span>
                </div>
                <button class="btn btn-sm btn-success" style="float: right; margin: 2px; padding: 2px"
                  @click="downloadExport(exp.id)">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="container" v-show="tab == 'analytics'">
          <div class="row border-bottom">
            <h6>This is a rough mockup only. It doesn't do anything yet</h6>
          </div>

          <div class="row border-bottom">
            <div class="col-sm-2">
              <div class="row">
                Dataset
              </div>
              <div class="row">
                <select v-model="selectedDataset">
                  <option v-for="mDataset in allDatasets" :value="mDataset" :key="mDataset.id">{{ mDataset.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-sm-1">
              <div class="row">
                Image
              </div>
              <div class="row">
                <input type="text" readonly id="analyticsImageNum" value="Placeholder"
                  :style="{ height: '20px', width: '50px' }">
              </div>
            </div>

            <div class="col-sm-9">
              <button type="button" class="btn btn-dark btn-sm mx-2">
                Combine
              </button>
              <button type="button" class="btn btn-dark btn-sm mx-2">
                Delete
              </button>
              <button type="button" class="btn btn-dark btn-sm mx-2">
                Split
              </button>
              <button type="button" class="btn btn-dark btn-sm mx-2">
                Comment
              </button>
              <button type="button" class="btn btn-dark btn-sm mx-2">
                External Link
              </button>
              <button type="button" class="btn btn-dark btn-sm mx-2">
                Resume
              </button>
              <button type="button" class="btn btn-dark btn-sm mx-2">
                Output File
              </button>
            </div>

          </div>

          <div class="row border-bottom my-2">
            <div class="col">
              <form class="w-100">
                <div class="form-group">

                  <input type="text" readonly id="scrollJourney" class="form-control form-control-lg"
                    value="Scrolling journey thing goes here " :style="{ height: '150px' }">

                </div>
              </form>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-sm-3 border-right">
              <form>
                <div class="form-group">
                  <label for="OCRText">OCR Text</label>
                  <div class="row">
                    <input type="text" readonly id="OCRText" class="text-wrap"
                      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                      :style="{ height: '300px' }">
                  </div>
                </div>
              </form>
            </div>
            <div class="col-sm-9">
              <template>
                <div class="form-group">
                  <label for="my-input">Screenshots</label>
                  <input id="my-input" class="form-control form-control-lg" type="text" value="Images go here" readonly
                    :style="{ height: '300px' }" />
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="container" v-show="tab == 'members'">
          <div class="card my-3 p-3 shadow-sm mr-2">
            <h6 class="border-bottom border-gray pb-2">
              <b>Invite Members</b>
            </h6>
          </div>

          <div class="card my-3 p-3 shadow-sm mr-2">
            <h6 class="border-bottom border-gray pb-2">
              <b>Existing Members</b>
            </h6>

            <div class="media text-muted pt-3" v-for="user in users">
              <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png"
                class="mr-2 rounded" style="width: 32px; height: 32px" />
              <div
                class="
                                                                                                                                      media-body
                                                                                                                                      pb-3
                                                                                                                                      mb-0
                                                                                                                                      small
                                                                                                                                      lh-125
                                                                                                                                      border-bottom border-gray
                                                                                                                                    ">
                <div
                  class="
                                                                                                                                        d-flex
                                                                                                                                        justify-content-between
                                                                                                                                        align-items-center
                                                                                                                                        w-100
                                                                                                                                      ">
                  <div class="text-gray-dark">
                    <strong>{{ user.name }}</strong> @{{ user.username }}
                  </div>
                  <a href="#">{{ user.group }}</a>
                </div>
                <span class="d-block">Last seen:
                  {{
                    new Date(user.last_seen["$date"])
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ")
                  }}
                  UTC</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container" v-show="tab == 'statistics'">
          <div v-if="stats == null">Crunching numbers...</div>

          <div v-else>
            <div class="row">
              <div v-if="stats.total" class="card my-3 p-3 shadow-sm col-3 mr-2">
                <h6 class="border-bottom border-gray pb-2"><b>Total</b></h6>
                <div class="row" v-for="stat in Object.keys(stats.total)">
                  <strong class="col-8">{{ stat }}:</strong>
                  <span class="col-4">{{ stats.total[stat].toFixed(0) }}</span>
                </div>
              </div>

              <div v-if="stats.average" class="card my-3 p-3 shadow-sm col-4 mr-2">
                <h6 class="border-bottom border-gray pb-2"><b>Average</b></h6>
                <div class="row" v-for="stat in Object.keys(stats.average)">
                  <strong class="col-8">{{ stat }}:</strong>
                  <span class="col-4">{{
                    stats.average[stat].toFixed(0)
                  }}</span>
                </div>
              </div>

              <div v-if="stats.categories" class="card my-3 p-3 shadow-sm col-4 mr-2">
                <h6 class="border-bottom border-gray pb-2">
                  <b>Annotations Per Category</b>
                </h6>
                <div class="row" v-for="stat in Object.keys(stats.categories)">
                  <strong class="col-8">{{ stat }}:</strong>
                  <span class="col-4">{{
                    stats.categories[stat].toFixed(0)
                  }}</span>
                </div>
              </div>

              <div v-if="stats.images_per_category" class="card my-3 p-3 shadow-sm col-4 mr-2">
                <h6 class="border-bottom border-gray pb-2">
                  <b>Annotated Images Per Category</b>
                </h6>
                <div class="row" v-for="stat in Object.keys(stats.images_per_category)">
                  <strong class="col-8">{{ stat }}:</strong>
                  <span class="col-4">{{
                    stats.images_per_category[stat].toFixed(0)
                  }}</span>
                </div>
              </div>

              <div v-if="stats.users" class="card my-3 p-3 shadow-sm col-6 mr-2">
                <h6 class="border-bottom border-gray pb-2">
                  <b>Annotations per User</b>
                </h6>
                <h6 class="row border-bottom border-gray pb-2">
                  <span class="col-4">Username</span>
                  <span class="col-4">Annotations</span>
                  <span class="col-4">Images</span>
                </h6>
                <div class="row" v-for="stat in Object.keys(stats.users)">
                  <strong class="col-4">{{ stat }}:</strong>
                  <span class="col-4">{{
                    stats.users[stat]["annotations"].toFixed(0)
                  }}</span>
                  <span class="col-4">{{
                    stats.users[stat]["images"].toFixed(0)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container" v-show="tab == 'settings'">
          <div class="card my-3 p-3 shadow-sm mr-2">
            <h6 class="border-bottom border-gray pb-2"><b>Metadata</b></h6>

            <button class="btn btn-sm btn-block btn-danger" @click="resetMetadata">
              Rest All Metadata
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- hack workaround to hide sidebar -->
    <div id="filter" ref="sidebar" class="sidebar" :style="{ width: 0 + 'px' }">
      <div style="padding-top: 10px" />
      <h3>{{ dataset.name }}</h3>
      <p class="text-center" style="color: lightgray">
        Total of <strong style="color: white">{{ imageCount }}</strong> images
        displayed on <strong style="color: white">{{ pages }}</strong> pages.
      </p>
      <div class="row justify-content-md-center sidebar-section-buttons">
        <button type="button" class="btn btn-success btn-block" data-toggle="modal" data-target="#generateDataset">
          <div v-if="generate.id != null" class="progress">
            <div class="progress-bar bg-success" :style="{ width: `${generate.progress}%` }">
              Generating
            </div>
          </div>
          <div v-else>Generate</div>
        </button>

        <button type="button" class="btn btn-secondary btn-block" @click="createScanTask">
          <div v-if="scan.id != null" class="progress">
            <div class="progress-bar bg-secondary" :style="{ width: `${scan.progress}%` }">
              Scanning
            </div>
          </div>
          <div v-else>Scan</div>
        </button>

        <button type="button" class="btn btn-primary btn-block" @click="importModal">
          <div v-if="importing.id != null" class="progress">
            <div class="progress-bar bg-primary" :style="{ width: `${importing.progress}%` }">
              Importing
            </div>
          </div>
          <div v-else>Import COCO</div>
        </button>

        <button type="button" class="btn btn-dark btn-block" @click="exportModal">
          <div v-if="exporting.id != null" class="progress">
            <div class="progress-bar bg-dark" :style="{ width: `${exporting.progress}%` }" updatePage>
              Exporting
            </div>
          </div>
          <div v-else>Export COCO</div>
        </button>


      </div>
      <hr />
      <h6 class="sidebar-title text-center">Subdirectories</h6>
      <div class="sidebar-section" style="max-height: 30%; color: lightgray">
        <div v-if="subdirectories.length > 0">
          <button v-for="(subdirectory, subId) in subdirectories" :key="subId"
            class="btn badge badge-pill badge-primary category-badge" style="margin: 2px"
            @click="folders.push(subdirectory)">
            {{ subdirectory }}
          </button>
        </div>
        <p v-else style="margin: 0; font-size: 13px; color: gray">
          No subdirectory found.
        </p>
      </div>
      <hr />
      <h6 class="sidebar-title text-center">Filtering Options</h6>
      <div class="sidebar-section" style="max-height: 30%; color: lightgray">
        <PanelString name="Contains" v-model="query.file_name__icontains" @submit="updatePage" />
        <PanelToggle name="Show Annotated" v-model="panel.showAnnotated" />
        <PanelToggle name="Show Not Annotated" v-model="panel.showNotAnnotated" />
        <PanelDropdown name="Order" v-model="order" :values="orderTypes" />
      </div>
      <div class="sidebar-section" style="max-height: 30%; color: lightgray">
        <div class="form-group">
          <label>Show Annotated Categories </label>
          <TagsInput v-model="selected.categories" element-id="selectedCategories"
            title="Only shows images annotated with the selected categories for 'Show Annotated' button. Leave empty to show all annotated images."
            :existing-tags="categoryTags" :typeahead="true" :typeahead-activation-threshold="0"></TagsInput>
        </div>
      </div>
    </div>

    <!-- zoom image modal here -->
    <!-- <modal name="zoom-image-modal">
      <img :src="this.$modal.params.image" alt="My Image">
    </modal> -->

    <div class="modal fade" tabindex="-1" role="dialog" id="createBatchCategories">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Creating a Batch Category</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Name:</label>
                <input v-model="newBatchCategoryName" class="form-control"
                  :class="{ 'is-invalid': newBatchCategoryName.trim().length === 0 }" required="true"
                  placeholder="Name" />
              </div>

              <div class="form-group">
                <label>Supercategory:</label>
                <input v-model="newBatchCategorySupercategory" class="form-control" :placeholder="newBatchCategorySupercategory" />
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Color:</label>
                <div class="col-sm-9">
                  <input v-model="newBatchCategoryColor" type="color" class="form-control" />
                </div>
              </div>

              <!-- <div class="form-group">
                <KeypointsDefinition ref="keypoints" v-model="newBatchCategoryKeypoint" element-id="keypoints"
                  placeholder="Add a keypoint"></KeypointsDefinition>
              </div> -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" :disabled="!isBatchFormValid"
              :class="{ disabled: !isBatchFormValid }" @click="createBatchCategory">
              Create Batch Category
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="zoomImageOnRightClick">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <!-- <div class="modal-header">
            <h5 class="modal-title">Zoom image modal</h5>
          </div> -->
          <div class="modal-body">
            <img :src="zoomImageURL" />
          </div>
          <div class="modal-footer">
            {{ zoomImageName }}
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="generateDataset">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Generate a Dataset</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Keyword</label>
                <input class="form-control" v-model="keyword" />
              </div>
              <div class="form-group">
                <label>Limit</label>
                <input class="form-control" type="number" v-model="generateLimit" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="generateDataset">
              Generate
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="cocoUpload">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Upload COCO Annotaitons</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="coco">COCO Annotation file (.json)</label>
                <input type="file" class="form-control-file" id="coco" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="importCOCO" data-dismiss="modal">
              Upload
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="tagsetUpload">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Upload tagset</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Uploading a tagset will replace existing available labels for this dataset
            </p>
            <form>
              <div class="form-group">
                <label for="tagsetJSON">Select tagset</label>
                <input type="file" class="form-control-file" id="tagsetJSON" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="importTagset" data-dismiss="modal">
              Upload
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="tagsetDownload">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Export tagset</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Download only categories currently assigned to this dataset

              Categories currently assigned to this dataset:
            </p>
            <template v-for="(category, index) in categories">
              <span v-if="category.category_type == 'batch'" :key="index"
                class="badge badge-pill badge-primary category-badge" :style="{ 'background-color': category.color }">
                {{ category.name }}
              </span>
            </template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="exportTagset" data-dismiss="modal">
              Download
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="exportDataset">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Export {{ dataset.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Categories (Empty export all)</label>
                <TagsInput v-model="exporting.categories" element-id="exportCategories" :existing-tags="categoryTags"
                  :typeahead="true" :typeahead-activation-threshold="0"></TagsInput>
              </div>
              <div>
                <input type="checkbox" class="form-check-input" v-model="exporting.with_empty_images" />
                <label class="form-check-label">export with not annotated images</label>
              </div>
              <div>
                <input type="checkbox" class="form-check-input" v-model="exporting.as_csv" />
                <label class="form-check-label">export as .csv file</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="exportCOCO">
              Export
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toastrs from "@/mixins/toastrs";
import Dataset from "@/models/datasets";
import Datasets from "@/models/datasets";
import ImageAPI from "@/models/image";
import Export from "@/models/exports";
import ImageCard from "@/components/cards/ImageCard";
import ImageCardBatch from "@/components/cards/ImageCardBatch";
// import DragSelect from "vue-drag-select";
import Pagination from "@/components/Pagination";
import PanelString from "@/components/PanelInputString";
import PanelToggle from "@/components/PanelToggle";
import PanelDropdown from "@/components/PanelInputDropdown";
import JQuery from "jquery";
import TagsInput from "@/components/TagsInput";
import FileTitle from "@/components/annotator/FileTitle";
import Category from "@/components/annotator/Category";
import Label from "@/components/annotator/Label";
import Annotations from "@/models/annotations";

import CategoryAPI from "@/models/categories";

import { mapMutations } from "vuex";
import MyDragSel from "../components/DragSelect.vue";

let $ = JQuery;

export default {
  name: "Dataset",
  components: {
    FileTitle,
    Category,
    CategoryAPI,
    CLabel: Label,
    ImageCard,
    ImageCardBatch,
    Pagination,
    PanelString,
    PanelToggle,
    PanelDropdown,
    TagsInput,
    MyDragSel,
  },
  mixins: [toastrs],
  props: {
    identifier: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      pages: 1,
      generateLimit: 100,
      limit: 52,
      imageCount: 0,
      categories: [],
      images: [],
      folders: [],
      dataset: {
        id: 0,
      },

      //this is for the dropdown bar
      allDatasets: {},
      selectedDataset: {},

      allData: {},
      users: [],
      subdirectories: [],
      status: {
        data: { state: true, message: "Loading data" },
      },
      keyword: "",
      mouseDown: false,
      sidebar: {
        drag: false,
        width: window.innerWidth * 0.2,
        canResize: false,
      },
      scan: {
        progress: 0,
        id: null,
      },
      generate: {
        progress: 0,
        id: null,
      },
      importing: {
        progress: 0,
        id: null,
      },
      exporting: {
        categories: [],
        progress: 0,
        with_empty_images: false,
        id: null,
        as_csv: false
      },
      tagsetImporting: {
        jsonData: {},
        categories: [],
        supercategory: null,
        allCategories: [],
        progress: 0,
        with_empty_images: false,
        id: null,
      },
      selected: {
        categories: [],
      },
      datasetExports: [],
      tab: "batchtag",
      order: "file_name",
      orderTypes: {
        file_name: "File Name",
        id: "Id",
        path: "File Path",
      },
      query: {
        file_name__icontains: "",
        ...this.$route.query,
      },
      panel: {
        showAnnotated: true,
        showNotAnnotated: true,
      },

      stats: null,

      selectedCards: [],
      selectedImages: [],
      selectedForZoomModal: [],
      zoomImage: null,
      zoomImageURL: "",
      zoomImageName: "",

      removeBatchCategory: false,

      activeBatchCategory: null,

      newBatchCategoryName: "",
      newBatchCategorySupercategory: "",
      newBatchCategoryColor: null,
      newBatchCategoryKeypoint: {
        labels: [],
        edges: [],
        colors: []
      },
    };
  },
  methods: {
    ...mapMutations(["addProcess", "removeProcess"]),
    generateDataset() {
      if (this.keyword.length === 0) return;

      Dataset.generate(this.dataset.id, {
        keywords: [this.keyword],
        limit: this.generateLimit,
      });
    },
    updatePage(page) {
      let process = "Loading images from dataset";
      this.addProcess(process);

      console.log("the folder thing");
      console.log(this.folders);

      Dataset.getData(this.dataset.id, {
        page: page,
        limit: this.limit,
        folder: this.folders.join("/"),
        ...this.query,
        annotated: this.queryAnnotated,
        category_ids__in: encodeURI(this.selected.categories),
        order: this.order,
      })
        .then((response) => {
          let data = response.data;
          console.log("still figuring out the folder thing full data");
          console.log(data);

          this.allData = data;

          this.images = data.images;
          console.log("images list");
          console.log(this.images);
          this.dataset = data.dataset;
          this.categories = data.categories;

          this.imageCount = data.total;
          this.pages = data.pages;

          this.subdirectories = data.subdirectories;
          // this.scan.id = data.scanId;
          // this.generate.id = data.generateId;
          // this.importing.id = data.importId;
          // this.exporting.id = data.exportId;
        })
        .catch((error) => {
          this.axiosReqestError("Loading Dataset", error.response.data.message);
        })
        .finally(() => this.removeProcess(process));

      // get all datasets for the dropdown menu
      Datasets.allData({
        limit: this.limit,
        page: page
      }).then(response => {
        this.allDatasets = response.data.datasets;
        console.log("hello allDatasets");
        console.log(this.allDatasets);
        // this.categories = response.data.categories;
        // this.subdirectories = response.data.subdirectories;
        // this.pages = response.data.pagination.pages;
        // this.page = response.data.pagination.page;
        // AdminPanel.getUsers(this.limit)
        //   .then(response => {
        //     this.users = response.data.users;
        //   });
      })
        .finally(() => this.removeProcess(process));

      // get every categories for checking purposes
      CategoryAPI.allData({
        page: 1,
        limit: 9999
      })
        .then(response => {
          this.tagsetImporting.allCategories = response.data.categories;

        })


    },
    getUsers() {
      Dataset.getUsers(this.dataset.id).then((response) => {
        this.users = response.data;
      });
    },
    downloadExport(id) {
      Export.download(id, this.dataset.name);
    },
    getExports() {
      Dataset.getExports(this.dataset.id).then((response) => {
        this.datasetExports = response.data;
      });
    },
    resetMetadata() {
      let r = confirm(
        "You can not undo reseting of all metadata in" +
        "this dataset. This includes metadata of images" +
        "and annotations."
      );

      if (r) {
        Dataset.resetMetadata(this.dataset.id);
      }
    },
    getStats() {
      Dataset.getStats(this.dataset.id).then((response) => {
        this.stats = response.data;
      });
    },
    createScanTask() {
      if (this.scan.id != null) {
        this.$router.push({ path: "/tasks", query: { id: this.scan.id } });
        return;
      }

      Dataset.scan(this.dataset.id)
        .then((response) => {
          let id = response.data.id;
          this.scan.id = id;
        })
        .catch((error) => {
          this.axiosReqestError(
            "Scanning Dataset",
            error.response.data.message
          );
        })
        .finally(() => this.removeProcess(process));
    },
    exportModal() {
      if (this.exporting.id != null) {
        this.$router.push({ path: "/tasks", query: { id: this.exporting.id } });
        return;
      }
      $("#exportDataset").modal("show");
    },
    exportCOCO() {
      $("#exportDataset").modal("hide");
      console.log("this.dataset.id: ");
      console.log(this.dataset.id);
      // console.log("exporting as csv");
      // console.log(this.exporting.as_csv);
      Dataset.exportingCOCO(
        this.dataset.id,
        this.exporting.categories,
        this.exporting.with_empty_images,
        this.exporting.as_csv
      )
        .then((response) => {
          let id = response.data.id;
          this.exporting.id = id;
        })
        .catch((error) => {
          this.axiosReqestError("Exporting COCO", error.response.data.message);
        })
        .finally(() => this.removeProcess(process));
    },

    exportTagset() {
      $("#tagsetDownload").modal("hide");
      console.log("exporting following categories");
      console.log(this.categories);

      Dataset.exportingTagset(
        this.dataset.id
      )
        .then((response) => {
          console.log(response);
          // let id = response.data.id;
          // this.exporting.id = id;
        })
        .catch((error) => {
          this.axiosReqestError("Exporting Tagset", error.response.data.message);
        })

    },


    removeFolder(folder) {
      let index = this.folders.indexOf(folder);
      this.folders.splice(index + 1, this.folders.length);
    },
    importModal() {
      // console.log("importModal importing.id ");
      // console.log(this.importing.id);
      if (this.importing.id != null) {
        this.$router.push({ path: "/tasks", query: { id: this.importing.id } });
        return;
      }

      $("#cocoUpload").modal("show");
    },
    tagsetModal() {
      // console.log("importModal importing.id ");
      // console.log(this.importing.id);
      // if (this.tagsetImporting.id != null) {
      //   this.$router.push({ path: "/tasks", query: { id: this.tagsetImporting.id } });
      //   return;
      // }

      $("#tagsetUpload").modal("show");
    },

    exportTagsetModal() {
      // console.log("importModal importing.id ");
      // console.log(this.importing.id);
      // if (this.tagsetImporting.id != null) {
      //   this.$router.push({ path: "/tasks", query: { id: this.tagsetImporting.id } });
      //   return;
      // }

      $("#tagsetDownload").modal("show");
    },




    importCOCO() {
      let uploaded = document.getElementById("coco");
      console.log("coco to be updated");
      console.log(uploaded.files);
      Dataset.uploadCoco(this.dataset.id, uploaded.files[0])
        .then((response) => {
          let id = response.data.id;
          this.importing.id = id;
        })
        .catch((error) => {
          this.axiosReqestError("Importing COCO", error.response.data.message);
        })
        .finally(() => this.removeProcess(process));
    },

    // to handle importing tagset
    importTagset() {
      let uploaded = document.getElementById("tagsetJSON");
      console.log("tagset to be updated");
      // console.log(uploaded.files[0]);

      let jsonFileRaw = uploaded.files[0];

      const reader = new FileReader();


      reader.onload = () => {
        const json = JSON.parse(reader.result);
        this.tagsetImporting.jsonData = json;
        // console.log(this.tagsetImporting.jsonData);
        this.tagsetImporting.categories = this.tagsetImporting.jsonData.tags;
        this.tagsetImporting.supercategory = this.tagsetImporting.jsonData.supercategory;
        this.newBatchCategorySupercategory = this.tagsetImporting.jsonData.supercategory;
        // console.log(this.tagsetImporting.categories);


        // update the dataset's categories list
        // check out DatasetCard, steps in there

        let existingCategories = this.categories;
        let existingAnnoCategories = Array.from(existingCategories.filter(cat => cat.category_type == "annotation"));
        // var imagesToShow = Array.from(this.images.filter(im => this.selectedForZoomModal.includes(String(im.id))));
        console.log("existingAnnoCategories");
        console.log(existingAnnoCategories);

        let categoriesToPush = [];

        let promises = [];

        for (let tag of this.tagsetImporting.categories) {
          // check if tagsetImporting.allCategories contains it
          // if (!im.batch_annotations.some(cat => cat.id == this.activeBatchCategory.id))
          if (!this.tagsetImporting.allCategories.some(cat => cat.name == tag.name)) {
            // if category name not registered yet, create it (promises)
            promises.push(
              CategoryAPI.create({
                name: tag.name,
                category_type: "batch",
                supercategory: this.tagsetImporting.supercategory,
                color: tag.color,
                keypoint_labels: [],
                keypoint_edges: [],
                keypoint_colors: [],
              })
            );
          } else {
            existingAnnoCategories.push(tag);
          }


        };

        Promise.all(promises).then((response) => {

          console.log("data coming back from CategoryAPI promises");
          console.log(response);

          for (let i of response) {
            existingAnnoCategories.push(i.data)
          }

          existingAnnoCategories.forEach(ele => categoriesToPush.push(ele.name));

        })
          .catch(error => {
            console.error(error)
          }).finally(() => {
            axios
              .post("/api-screenlife/dataset/" + this.dataset.id, {
                categories: categoriesToPush,
                default_annotation_metadata: this.dataset.default_annotation_metadata
              })
              .then(() => {
                this.updatePage();
              });

          })

      };

      reader.readAsText(jsonFileRaw);

    },

    createBatchCategory() {

      $("#createBatchCategories").modal("hide");

      let batchCategoryToAdd = null;
      let existingCategories = this.categories;
      let categoriesToPush = [];

      // check if category already exists
      if (this.tagsetImporting.allCategories.some(cat => cat.name == this.newBatchCategoryName)) {
        batchCategoryToAdd = this.tagsetImporting.allCategories.find(x => x.name == this.newBatchCategoryName);
        console.log(batchCategoryToAdd);

        existingCategories.push(batchCategoryToAdd);
        existingCategories.forEach(ele => categoriesToPush.push(ele.name));

        axios
          .post("/api-screenlife/dataset/" + this.dataset.id, {
            categories: categoriesToPush,
            default_annotation_metadata: this.dataset.default_annotation_metadata
          })
          .then(() => {
            this.updatePage();
          });
      } else {
        // create the new category

        if (this.newBatchCategoryName.length < 1) return;

        CategoryAPI.create({
          name: this.newBatchCategoryName,
          category_type: "batch",
          supercategory: this.tagsetImporting.supercategory,
          color: this.newBatchCategoryColor,
          keypoint_labels: this.newBatchCategoryKeypoint.labels,
          keypoint_edges: this.newBatchCategoryKeypoint.edges,
          keypoint_colors: this.newBatchCategoryKeypoint.colors,
        })
          .then((response) => {
            batchCategoryToAdd = response.data;
            console.log(batchCategoryToAdd);
            this.newBatchCategoryName = "";
            this.newBatchCategorySupercategory = "";
            this.newBatchCategoryColor = null;
            this.newBatchCategoryKeypoint = {};

            existingCategories.push(batchCategoryToAdd);
            existingCategories.forEach(ele => categoriesToPush.push(ele.name));

            axios
              .post("/api-screenlife/dataset/" + this.dataset.id, {
                categories: categoriesToPush,
                default_annotation_metadata: this.dataset.default_annotation_metadata
              })
              .then(() => {
                this.updatePage();
              });
          })
          .catch(error => {
            this.axiosReqestError(
              "Creating Category",
              error.response.data.message
            );
          });
      }

      // TODO: now add the category to this dataset's active categories
    },

    mouseMove(event) {
      let element = this.$refs.sidebar;

      let sidebarWidth = element.offsetWidth;
      let clickWidth = event.x;
      let pixelsFromSide = Math.abs(sidebarWidth - clickWidth);

      this.sidebar.drag = pixelsFromSide < 4;

      if (this.sidebar.canResize) {
        event.preventDefault();
        let max = window.innerWidth * 0.5;
        this.sidebar.width = Math.min(Math.max(event.x, 150), max);
        localStorage.setItem("dataset/sideWidth", this.sidebar.width);
      }
    },
    startDrag() {
      this.mouseDown = true;
      this.sidebar.canResize = this.sidebar.drag;
    },
    stopDrag() {
      this.mouseDown = false;
      this.sidebar.canResize = false;
    },


    // handling the redirection in dropdown menu

    redirectDataset(event) {
      console.log("hello redirectDataset");
      console.log(this.selectedDataset);

      // go to the dataset page proper
      let identifier = this.selectedDataset.id;
      // let identifier = 4;

      // this.$router.push({ name: "dataset", params: { identifier } });
      this.$router.replace({ params: { identifier } });

      // this.$router.push({ name: "dataset", params: { identifier } })
      //   .then(() => {
      //     console.log('Updated route ', this.$route)
      //     // process the updated route params
      //   });
    },

    // handling showing a zoomed image on right click
    showZoomModal(event) {
      // workaround: make sure no active category is selected so it won't tag
      this.activeBatchCategory = null

      console.log("hello showZoomModal");
      console.log(event);
      this.selectedForZoomModal = event;
      var imagesToShow = Array.from(this.images.filter(im => this.selectedForZoomModal.includes(String(im.id))));

      // workaround: since there might be multiple images, just pick the first one
      var imageToShow = imagesToShow[0];
      console.log("imageToShow");
      console.log(imageToShow);

      this.zoomImage = imageToShow;

      this.zoomImageURL = "/api-screenlife/image/" + imageToShow.id + "?width=300";
      this.zoomImageName = imageToShow.name;
      $('#zoomImageOnRightClick').modal('show');



    },


    // handling selection of the images
    selectChange(event) {
      this.selectedImages = event;
      // console.log("hello selectChange");
      // console.log(event);

      var imagesToTag = Array.from(this.images.filter(im => this.selectedImages.includes(String(im.id))));
      console.log("hello selectChange - imagesToTag");
      // console.log(typeof (imagesToTag))
      console.log(imagesToTag);
      console.log("hello selectChange - this.removeBatchCategory");
      // console.log(typeof (imagesToTag))
      console.log(this.removeBatchCategory);



      if (this.activeBatchCategory != null) {

        for (var im of imagesToTag) {
          // if not removing category
          if (!this.removeBatchCategory) {
            if (!im.batch_annotations.some(cat => cat.id == this.activeBatchCategory.id)) {

              im.batch_annotations.push(this.activeBatchCategory);



              // now to handle the actual API call to update db

              var imgID = parseInt(im.id);
              var categoryInfo = this.activeBatchCategory;

              // ImageAPI.getCoco(imgID)
              //   .then((response) => {
              //     console.log("imageAPI getCOCO response");
              //     console.log(response);
              //   })
              //   .catch((error) => {
              //     this.axiosReqestError("Loading Dataset", error.response.data.message);
              //   })
              //   .finally(() => this.removeProcess(process));

              ImageAPI.update(imgID, {
                category_info: categoryInfo,
                remove_category: this.removeBatchCategory,
              })
                .then((response) => {
                  console.log("imageAPI response");
                  console.log(response);
                })
                .catch((error) => {
                  this.axiosReqestError("Loading Dataset", error.response.data.message);
                })
                .finally(() => this.removeProcess(process));

            }
          } else {
            if (im.batch_annotations.some(cat => cat.id == this.activeBatchCategory.id)) {
              // remove the category
              for (var i = 0; i < im.batch_annotations.length; i++) {
                if (im.batch_annotations[i].id == this.activeBatchCategory.id) {
                  im.batch_annotations.splice(i, 1);
                  break;
                }
              }

              var imgID = parseInt(im.id);
              var categoryInfo = this.activeBatchCategory;

              ImageAPI.update(imgID, {
                category_info: categoryInfo,
                remove_category: this.removeBatchCategory,
              })
                .then((response) => {
                  console.log("imageAPI response");
                  console.log(response);
                })
                .catch((error) => {
                  this.axiosReqestError("Loading Dataset", error.response.data.message);
                })
                .finally(() => this.removeProcess(process));
            }

          }
          // if (!im.batch_annotations.includes(this.activeBatchCategory)) {

        };

        // imagesToTag.forEach(item => item['batch_annotations'].push(this.activeBatchCategory));

        // console.log(imagesToTag);


      }

    }

  },
  computed: {
    queryAnnotated() {
      let showAnnotated = this.panel.showAnnotated;
      let showNotAnnotated = this.panel.showNotAnnotated;

      if (showAnnotated && showNotAnnotated) return null;
      if (!showAnnotated && !showNotAnnotated) return " ";

      return showAnnotated;
    },
    categoryTags() {
      let tags = {};
      this.categories.forEach((c) => (tags[c.id] = c.name));
      return tags;
    },

    isBatchFormValid() {
      return (
        this.newBatchCategoryName.length !== 0
      );
    },
  },
  sockets: {
    taskProgress(data) {
      if (data.id === this.scan.id) {
        this.scan.progress = data.progress;
      }

      if (data.id === this.generate.id) {
        this.generate.progress = data.progress;
      }

      if (data.id === this.importing.id) {
        this.importing.progress = data.progress;
      }

      if (data.id === this.exporting.id) {
        this.exporting.progress = data.progress;
      }
    },
    annotating(data) {
      let image = this.images.find((i) => i.id == data.image_id);
      if (image == null) return;

      if (data.active) {
        let found = image.annotating.indexOf(data.username);
        if (found < 0) {
          image.annotating.push(data.username);
        }
      } else {
        image.annotating.splice(image.annotating.indexOf(data.username), 1);
      }
    },
  },
  watch: {
    tab(tab) {
      localStorage.setItem("dataset/tab", tab);
      if (tab == "members") this.getUsers();
      if (tab == "statistics") this.getStats();
      if (tab == "exports") this.getExports();
    },
    order(order) {
      localStorage.setItem("dataset/order", order);
      this.updatePage();
    },
    queryAnnotated() {
      this.updatePage();
    },
    "selected.categories"(val) {
      this.updatePage();
    },
    folders() {
      this.updatePage();
    },
    "sidebar.drag"(canDrag) {
      let el = this.$refs.sidebar;
      if (canDrag) {
        this.$el.style.cursor = "ew-resize";
        el.style.borderRight = "4px solid #383c4a";
      } else {
        this.$el.style.cursor = "default";
        el.style.borderRight = "";
      }
    },
    "scan.progress"(progress) {
      if (progress >= 100) {
        setTimeout(() => {
          this.scan.progress = 0;
          this.scan.id = null;
        }, 1000);
      }
    },
    "importing.progress"(progress) {
      if (progress >= 100) {
        setTimeout(() => {
          this.importing.progress = 0;
          this.importing.id = null;
        }, 1000);
      }
    },
    "exporting.progress"(progress) {
      if (progress >= 100) {
        setTimeout(() => {
          this.exporting.progress = 0;
          this.exporting.id = null;

          this.getExports();
        }, 1000);
      }
    },
  },
  // beforeRouteUpdate(to, from) {
  //   console.log("toParams");
  //   console.log(to);
  //   console.log("previousParams");
  //   console.log(from);
  //   // this.dataset.id = parseInt(this.identifier);
  //   // this.updatePage();
  // },
  created() {
    // this.$watch(
    //   () => this.$route.params,
    //   (toParams, previousParams) => {
    //     console.log("toParams");
    //     console.log(toParams);
    //     console.log("previousParams");
    //     console.log(previousParams);

    //   }
    // )
    let tab = localStorage.getItem("dataset/tab");
    let order = localStorage.getItem("dataset/order");
    let sideWidth = localStorage.getItem("dataset/sideWidth");

    if (sideWidth !== null) this.sidebar.width = parseInt(sideWidth);
    if (tab !== null) this.tab = tab;
    if (order !== null) this.order = order;

    this.dataset.id = parseInt(this.identifier);
    console.log("hello from created");
    console.log(this.identifier);
    this.updatePage();
  },
  mounted() {
    // TODO: need or no?
    //this.tab = "batchtag";
    window.addEventListener("mouseup", this.stopDrag);
    window.addEventListener("mousedown", this.startDrag);
  },
  destroyed() {
    window.removeEventListener("mouseup", this.stopDrag);
    window.removeEventListener("mousedown", this.startDrag);
  },
};
</script>

<style scoped>
.breadcrumb {
  padding: 0px;
  margin: 5px 0;
}

.btn-link {
  padding: 0px;
}

.sidebar .title {
  color: white;
}

.progress {
  padding: 2px;
  height: 24px;
}

.sidebar {
  height: 100%;
  position: fixed;
  color: white;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #4b5162;
  overflow-x: hidden;
  padding-top: 60px;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

.sidebar-title {
  color: white;
}

.sidebar-section-buttons {
  margin: 5px;
}

.sidebar-section {
  margin: 5px;
  border-radius: 5px;
  background-color: #383c4a;
  padding: 0 5px 2px 5px;
  overflow: auto;
}

.category-badge {
  float: left;
  margin: 0 2px 5px 0;
}
</style>
