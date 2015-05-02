<!-- IF awards.length -->
<div class="panel panel-default">
    <div class="panel-body">

        <ul>
            <!-- BEGIN awards -->
            <li>
                <div class="media">
                    <div class="media-left">
                        <img src="{award.image}" class="img-responsive"/>
                    </div>
                    <div class="media-body">
                        <span class="award-title">{award.name}</span>
                        <span class="award-reason">{reason}</span>
                        <span class="award-info">handed at {createtime}</span>
                    </div>
                </div>
            </li>
            <!-- END awards -->
        </ul>

    </div>
</div>
<!-- ENDIF awards.length -->