<%@ page contentType="text/html;charset=UTF-8" %>
<section class="py-5 text-center container">
    <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Add new book</h1>

            <form method="post" enctype="multipart/form-data">
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex flex-column">
                            <img class="img-fluid rounded" id="coverImg" style="flex-grow: 1;">
                            <div>
                                <input class="form-control" type="file" name="cover" id="cover" required>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body" style="text-align: left;">
                                <h5 class="card-title">Book info</h5>

                                <div class="mb-3">
                                    <label for="titleInput" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="titleInput" name="title" required>
                                </div>
                                <div class="mb-3">
                                    <label for="authorInput" class="form-label">Author</label>
                                    <input type="text" class="form-control" id="authorInput" name="author" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>

<script src="js/bookaddform.js"></script>
