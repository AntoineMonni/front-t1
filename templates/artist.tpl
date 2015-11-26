<div class="artist-meta">
    <h2>{{name}}</h2>
    <div class="website">
        <span class="underline">Site web </span><span>&nbsp;:&nbsp;</span>
        {{#each details.url}}
            <a href="www.{{this}}">{{this}}</a>,
        {{/each}}
    </div>
</div>

<div class="artist-content">
    <p>{{details.presentation}}</p>
    <div class="quote">
        <p>{{details.quote}}</p>
    </div>
    <div class="artist-works">
        {{#each details.works}}
            <div class="artist-work">
                <span style="background-image: url('/assets/images/{{this.url}}');"></span>
                <a href="{{this.url}}" class="legend-container">
                    <span class="legend"><strong>{{this.name}}</strong>&nbsp;-&nbsp;<p>{{this.year}}</p></span>
                </a>
            </div>
        {{/each}}
    </div>
</div>